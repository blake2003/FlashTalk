import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccountStatus } from '@prisma/client';

export type AuthUser = {
  userId: string;
  email: string;
  status: AccountStatus;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    return request.user;
  },
);
