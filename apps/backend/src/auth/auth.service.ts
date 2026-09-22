import { Injectable } from '@nestjs/common';

/**
 * AuthModule skeleton — Phase 1:
 * register / verify-email / login / refresh / logout / password reset
 */
@Injectable()
export class AuthService {
  getStatus() {
    return { module: 'auth', status: 'scaffolded' };
  }
}
