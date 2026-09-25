import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountStatus } from '@prisma/client';
import { AuthUser } from '../decorators/current-user.decorator';

type AccessTokenPayload = {
  sub: string;
  email: string;
  status: AccountStatus;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('jwt.accessSecret'),
    });
  }

  validate(payload: AccessTokenPayload): AuthUser {
    return {
      userId: payload.sub,
      email: payload.email,
      status: payload.status,
    };
  }
}
