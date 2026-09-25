import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AccountStatus,
  EmailVerificationPurpose,
  User,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ApiException } from '../common/filters/api.exception';
import { ErrorCodes } from '../common/constants/error-codes';
import { addSeconds } from '../common/utils/time';
import {
  comparePassword,
  generateOpaqueToken,
  generateOtpCode,
  hashOtpCode,
  hashPassword,
  parseTtlToSeconds,
  sha256,
} from '../common/utils/crypto';
import {
  ForgotPasswordDto,
  LoginDto,
  LogoutDto,
  RefreshTokenDto,
  RegisterDto,
  ResendVerificationDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
  ) {}

  async register(dto: RegisterDto) {
    const email = this.normalizeEmail(dto.email);
    this.assertPasswordPolicy(dto.password);

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing && existing.status !== AccountStatus.DELETED) {
      throw new ApiException(
        ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS,
        'Email is already registered.',
        HttpStatus.CONFLICT,
      );
    }

    const passwordHash = await hashPassword(
      dto.password,
      this.config.getOrThrow<number>('bcryptRounds'),
    );

    const code = generateOtpCode();
    const codeHash = hashOtpCode(code);
    const expiresAt = addSeconds(
      new Date(),
      this.config.getOrThrow<number>('email.verificationTtlSeconds'),
    );

    const user = await this.prisma.$transaction(async (tx) => {
      let created: User;
      if (existing?.status === AccountStatus.DELETED) {
        created = await tx.user.update({
          where: { id: existing.id },
          data: {
            passwordHash,
            status: AccountStatus.PENDING_VERIFICATION,
            emailVerifiedAt: null,
            deletedAt: null,
            nickname: null,
            avatarUrl: null,
          },
        });
      } else {
        created = await tx.user.create({
          data: {
            email,
            passwordHash,
            status: AccountStatus.PENDING_VERIFICATION,
          },
        });
      }

      await tx.emailVerification.create({
        data: {
          userId: created.id,
          codeHash,
          purpose: EmailVerificationPurpose.VERIFY_EMAIL,
          expiresAt,
        },
      });

      return created;
    });

    await this.sendMailSafely(() =>
      this.mail.sendVerificationCode(email, code),
    );

    return {
      userId: user.id,
      status: user.status,
      verificationRequired: true,
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.status === AccountStatus.DELETED) {
      throw new ApiException(
        ErrorCodes.AUTH_CODE_INVALID,
        'Invalid verification code.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.assertAccountNotBlocked(user);

    if (user.status === AccountStatus.ACTIVE && user.emailVerifiedAt) {
      return { userId: user.id, status: user.status, verified: true };
    }

    const record = await this.findLatestOpenCode(
      user.id,
      EmailVerificationPurpose.VERIFY_EMAIL,
    );
    await this.consumeOtp(record, dto.code);

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        status: AccountStatus.ACTIVE,
        emailVerifiedAt: new Date(),
      },
    });

    return {
      userId: updated.id,
      status: updated.status,
      verified: true,
    };
  }

  async resendVerification(dto: ResendVerificationDto) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Avoid email enumeration
    if (!user || user.status === AccountStatus.DELETED) {
      return { sent: true };
    }

    this.assertAccountNotBlocked(user);

    if (user.status === AccountStatus.ACTIVE && user.emailVerifiedAt) {
      return { sent: true };
    }

    await this.issueAndSendCode(
      user.id,
      email,
      EmailVerificationPurpose.VERIFY_EMAIL,
      (code) => this.mail.sendVerificationCode(email, code),
    );

    return { sent: true };
  }

  async login(dto: LoginDto) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.status === AccountStatus.DELETED) {
      throw new ApiException(
        ErrorCodes.AUTH_INVALID_CREDENTIALS,
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordOk = await comparePassword(dto.password, user.passwordHash);
    if (!passwordOk) {
      throw new ApiException(
        ErrorCodes.AUTH_INVALID_CREDENTIALS,
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.assertAccountNotBlocked(user);

    if (user.status === AccountStatus.PENDING_VERIFICATION) {
      throw new ApiException(
        ErrorCodes.AUTH_EMAIL_NOT_VERIFIED,
        'Email verification is required before login.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.status !== AccountStatus.ACTIVE) {
      throw new ApiException(
        ErrorCodes.AUTH_INVALID_CREDENTIALS,
        'Invalid email or password.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    });

    return this.issueTokenPair(user);
  }

  async refresh(dto: RefreshTokenDto) {
    const tokenHash = sha256(dto.refreshToken);
    const stored = await this.prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!stored) {
      throw new ApiException(
        ErrorCodes.AUTH_REFRESH_TOKEN_INVALID,
        'Refresh token is invalid or expired.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.assertAccountNotBlocked(stored.user);

    if (stored.user.status !== AccountStatus.ACTIVE) {
      throw new ApiException(
        ErrorCodes.AUTH_REFRESH_TOKEN_INVALID,
        'Refresh token is invalid or expired.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Rotate: revoke current, issue new pair
    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return this.issueTokenPair(stored.user, stored.deviceId);
  }

  async logout(dto: LogoutDto) {
    const tokenHash = sha256(dto.refreshToken);
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return { loggedOut: true };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const email = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Always succeed to avoid enumeration
    if (
      !user ||
      user.status === AccountStatus.DELETED ||
      user.status === AccountStatus.BANNED
    ) {
      return { sent: true };
    }

    try {
      await this.issueAndSendCode(
        user.id,
        email,
        EmailVerificationPurpose.RESET_PASSWORD,
        (code) => this.mail.sendPasswordResetCode(email, code),
      );
    } catch (error) {
      if (
        error instanceof ApiException &&
        (error.getResponse() as { code?: string }).code ===
          ErrorCodes.AUTH_CODE_RESEND_TOO_SOON
      ) {
        // Still return generic success for enumeration safety
        return { sent: true };
      }
      if (
        error instanceof ApiException &&
        (error.getResponse() as { code?: string }).code ===
          ErrorCodes.AUTH_CODE_DAILY_LIMIT_EXCEEDED
      ) {
        return { sent: true };
      }
      throw error;
    }

    return { sent: true };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const email = this.normalizeEmail(dto.email);
    this.assertPasswordPolicy(dto.newPassword);

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.status === AccountStatus.DELETED) {
      throw new ApiException(
        ErrorCodes.AUTH_CODE_INVALID,
        'Invalid reset code.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.assertAccountNotBlocked(user);

    const record = await this.findLatestOpenCode(
      user.id,
      EmailVerificationPurpose.RESET_PASSWORD,
    );
    await this.consumeOtp(record, dto.code);

    const passwordHash = await hashPassword(
      dto.newPassword,
      this.config.getOrThrow<number>('bcryptRounds'),
    );

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      }),
      // Revoke all refresh tokens after password reset
      this.prisma.refreshToken.updateMany({
        where: { userId: user.id, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);

    return { reset: true };
  }

  // --- helpers ---

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private assertPasswordPolicy(password: string) {
    const min = this.config.get<number>('password.minLength', 8);
    const max = this.config.get<number>('password.maxLength', 128);
    if (password.length < min || password.length > max) {
      throw new ApiException(
        ErrorCodes.AUTH_PASSWORD_INVALID,
        `Password must be between ${min} and ${max} characters.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private assertAccountNotBlocked(user: User) {
    if (user.status === AccountStatus.SUSPENDED) {
      throw new ApiException(
        ErrorCodes.AUTH_ACCOUNT_SUSPENDED,
        'Account is suspended.',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.status === AccountStatus.BANNED) {
      throw new ApiException(
        ErrorCodes.AUTH_ACCOUNT_BANNED,
        'Account is banned.',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.status === AccountStatus.DELETED) {
      throw new ApiException(
        ErrorCodes.AUTH_ACCOUNT_DELETED,
        'Account is deleted.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private async findLatestOpenCode(
    userId: string,
    purpose: EmailVerificationPurpose,
  ) {
    const record = await this.prisma.emailVerification.findFirst({
      where: {
        userId,
        purpose,
        verifiedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) {
      throw new ApiException(
        ErrorCodes.AUTH_CODE_INVALID,
        'Invalid verification code.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return record;
  }

  private async consumeOtp(
    record: {
      id: string;
      codeHash: string;
      expiresAt: Date;
      attemptCount: number;
    },
    code: string,
  ) {
    const maxAttempts = this.config.getOrThrow<number>('email.codeMaxAttempts');

    if (record.attemptCount >= maxAttempts) {
      throw new ApiException(
        ErrorCodes.AUTH_CODE_ATTEMPTS_EXCEEDED,
        'Too many invalid verification attempts.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    if (record.expiresAt.getTime() < Date.now()) {
      throw new ApiException(
        ErrorCodes.AUTH_CODE_EXPIRED,
        'Verification code has expired.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const ok = record.codeHash === hashOtpCode(code);
    if (!ok) {
      await this.prisma.emailVerification.update({
        where: { id: record.id },
        data: { attemptCount: { increment: 1 } },
      });
      throw new ApiException(
        ErrorCodes.AUTH_CODE_INVALID,
        'Invalid verification code.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.emailVerification.update({
      where: { id: record.id },
      data: { verifiedAt: new Date() },
    });
  }

  private async issueAndSendCode(
    userId: string,
    email: string,
    purpose: EmailVerificationPurpose,
    send: (code: string) => Promise<void>,
  ) {
    const resendInterval = this.config.getOrThrow<number>(
      'email.resendIntervalSeconds',
    );
    const dailyLimit = this.config.getOrThrow<number>('email.codeDailyLimit');

    const latest = await this.prisma.emailVerification.findFirst({
      where: { userId, purpose },
      orderBy: { createdAt: 'desc' },
    });

    if (
      latest &&
      Date.now() - latest.createdAt.getTime() < resendInterval * 1000
    ) {
      throw new ApiException(
        ErrorCodes.AUTH_CODE_RESEND_TOO_SOON,
        'Please wait before requesting another code.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const dayStart = new Date();
    dayStart.setUTCHours(0, 0, 0, 0);
    const sentToday = await this.prisma.emailVerification.count({
      where: {
        userId,
        purpose,
        createdAt: { gte: dayStart },
      },
    });

    if (sentToday >= dailyLimit) {
      throw new ApiException(
        ErrorCodes.AUTH_CODE_DAILY_LIMIT_EXCEEDED,
        'Daily verification code limit exceeded.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const code = generateOtpCode();
    const codeHash = hashOtpCode(code);
    const expiresAt = addSeconds(
      new Date(),
      this.config.getOrThrow<number>('email.verificationTtlSeconds'),
    );

    await this.prisma.emailVerification.create({
      data: { userId, codeHash, purpose, expiresAt },
    });

    await this.sendMailSafely(() => send(code));
  }

  private async sendMailSafely(send: () => Promise<void>) {
    try {
      await send();
    } catch (error) {
      this.logger.error(
        `Email send failed: ${error instanceof Error ? error.message : error}`,
      );
      throw new ApiException(
        ErrorCodes.EMAIL_SEND_FAILED,
        'Failed to send email.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private async issueTokenPair(user: User, deviceId?: string | null) {
    const accessTtl = this.config.getOrThrow<string>('jwt.accessTtl');
    const refreshTtl = this.config.getOrThrow<string>('jwt.refreshTtl');
    const accessSeconds = parseTtlToSeconds(accessTtl);
    const refreshSeconds = parseTtlToSeconds(refreshTtl);

    const accessToken = await this.jwt.signAsync(
      {
        sub: user.id,
        email: user.email,
        status: user.status,
      },
      {
        secret: this.config.getOrThrow<string>('jwt.accessSecret'),
        expiresIn: accessSeconds,
      },
    );

    const refreshToken = generateOpaqueToken();
    const expiresAt = addSeconds(new Date(), refreshSeconds);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: sha256(refreshToken),
        expiresAt,
        deviceId: deviceId ?? null,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + accessSeconds * 1000,
      user: {
        id: user.id,
        status: user.status,
      },
    };
  }
}
