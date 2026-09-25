import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

/**
 * Cleanup jobs: OTP / Refresh Token / Cooldown expiry / Session recovery
 */
@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  @Cron(CronExpression.EVERY_MINUTE)
  handleSessionExpirySweep() {
    // TODO: mark expired ACTIVE sessions from expires_at
    this.logger.debug('session expiry sweep tick');
  }
}
