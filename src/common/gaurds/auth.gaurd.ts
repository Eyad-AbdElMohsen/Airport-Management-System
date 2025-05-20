import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWT } from '../utils/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decoratore';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JWT,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No authorization header');

    const token = authHeader.replace('Bearer ', '');
    const payload = this.jwt.validateAccessToken(token);

    if (!payload) throw new UnauthorizedException('Invalid token');

    ctx.getContext().user = payload;

    const allowedRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (allowedRoles && !allowedRoles.includes(payload.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
