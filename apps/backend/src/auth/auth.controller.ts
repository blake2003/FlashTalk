import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  // POST /auth/verify-email
  // POST /auth/resend-verification
  // POST /auth/login
  // POST /auth/refresh
  // POST /auth/logout
  // POST /auth/forgot-password
  // POST /auth/reset-password
}
