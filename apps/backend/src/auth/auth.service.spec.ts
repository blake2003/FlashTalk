import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccountStatus } from '@prisma/client';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ApiException } from '../common/filters/api.exception';
import { ErrorCodes } from '../common/constants/error-codes';
import { hashOtpCode, hashPassword } from '../common/utils/crypto';

describe('AuthService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    emailVerification: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const jwt = {
    signAsync: jest.fn().mockResolvedValue('access.jwt.token'),
  };

  const config = {
    getOrThrow: jest.fn((key: string) => {
      const map: Record<string, string | number> = {
        bcryptRounds: 4,
        'email.verificationTtlSeconds': 600,
        'email.resendIntervalSeconds': 60,
        'email.codeMaxAttempts': 5,
        'email.codeDailyLimit': 10,
        'jwt.accessSecret': 'access-secret',
        'jwt.refreshSecret': 'refresh-secret',
        'jwt.accessTtl': '15m',
        'jwt.refreshTtl': '30d',
      };
      return map[key];
    }),
    get: jest.fn((key: string, fallback?: unknown) => {
      const map: Record<string, number> = {
        'password.minLength': 8,
        'password.maxLength': 128,
      };
      return map[key] ?? fallback;
    }),
  };

  const mail = {
    sendVerificationCode: jest.fn().mockResolvedValue(undefined),
    sendPasswordResetCode: jest.fn().mockResolvedValue(undefined),
  };

  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(
      prisma as unknown as PrismaService,
      jwt as unknown as JwtService,
      config as unknown as ConfigService,
      mail as unknown as MailService,
    );
  });

  describe('register', () => {
    it('rejects duplicate email', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'a@example.com',
        status: AccountStatus.ACTIVE,
      });

      await expect(
        service.register({ email: 'a@example.com', password: 'password1' }),
      ).rejects.toMatchObject({
        status: HttpStatus.CONFLICT,
      });

      try {
        await service.register({
          email: 'a@example.com',
          password: 'password1',
        });
      } catch (error) {
        const body = (error as ApiException).getResponse() as { code: string };
        expect(body.code).toBe(ErrorCodes.AUTH_EMAIL_ALREADY_EXISTS);
      }
    });

    it('creates user + verification and sends OTP', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.$transaction.mockImplementation(async (fn) =>
        fn({
          user: {
            create: jest.fn().mockResolvedValue({
              id: 'u-new',
              status: AccountStatus.PENDING_VERIFICATION,
            }),
          },
          emailVerification: {
            create: jest.fn().mockResolvedValue({}),
          },
        }),
      );

      const result = await service.register({
        email: 'New@Example.com',
        password: 'password1',
      });

      expect(result).toEqual({
        userId: 'u-new',
        status: AccountStatus.PENDING_VERIFICATION,
        verificationRequired: true,
      });
      expect(mail.sendVerificationCode).toHaveBeenCalledWith(
        'new@example.com',
        expect.stringMatching(/^\d{6}$/),
      );
    });
  });

  describe('login', () => {
    it('rejects unverified accounts', async () => {
      const passwordHash = await hashPassword('password1', 4);
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'a@example.com',
        passwordHash,
        status: AccountStatus.PENDING_VERIFICATION,
      });

      await expect(
        service.login({ email: 'a@example.com', password: 'password1' }),
      ).rejects.toMatchObject({ status: HttpStatus.FORBIDDEN });
    });

    it('issues token pair for ACTIVE user', async () => {
      const passwordHash = await hashPassword('password1', 4);
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'a@example.com',
        passwordHash,
        status: AccountStatus.ACTIVE,
      });
      prisma.user.update.mockResolvedValue({});
      prisma.refreshToken.create.mockResolvedValue({});

      const result = await service.login({
        email: 'a@example.com',
        password: 'password1',
      });

      expect(result.accessToken).toBe('access.jwt.token');
      expect(result.refreshToken).toEqual(expect.any(String));
      expect(result.user).toEqual({
        id: 'u1',
        status: AccountStatus.ACTIVE,
      });
      expect(prisma.refreshToken.create).toHaveBeenCalled();
    });
  });

  describe('verifyEmail', () => {
    it('activates user when OTP is valid', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'a@example.com',
        status: AccountStatus.PENDING_VERIFICATION,
        emailVerifiedAt: null,
      });
      prisma.emailVerification.findFirst.mockResolvedValue({
        id: 'ev1',
        codeHash: hashOtpCode('123456'),
        expiresAt: new Date(Date.now() + 60_000),
        attemptCount: 0,
      });
      prisma.emailVerification.update.mockResolvedValue({});
      prisma.user.update.mockResolvedValue({
        id: 'u1',
        status: AccountStatus.ACTIVE,
      });

      const result = await service.verifyEmail({
        email: 'a@example.com',
        code: '123456',
      });

      expect(result).toEqual({
        userId: 'u1',
        status: AccountStatus.ACTIVE,
        verified: true,
      });
    });
  });
});
