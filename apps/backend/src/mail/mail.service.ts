import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const provider = this.config.get<string>('email.provider', 'console');
    if (provider === 'console') {
      this.logger.log(`[console-mail] verification code for ${email}: ${code}`);
      return;
    }
    // TODO: integrate transactional email provider
    throw new Error('EMAIL_PROVIDER_NOT_CONFIGURED');
  }

  async sendPasswordResetCode(email: string, code: string): Promise<void> {
    const provider = this.config.get<string>('email.provider', 'console');
    if (provider === 'console') {
      this.logger.log(`[console-mail] reset code for ${email}: ${code}`);
      return;
    }
    throw new Error('EMAIL_PROVIDER_NOT_CONFIGURED');
  }
}
