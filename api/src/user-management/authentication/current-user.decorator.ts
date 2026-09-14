import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../models/user.model.js';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    return request.user;
  },
);
