import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWT } from '../utils/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwt: JWT,
    private readonly allowedRoles: string[],
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No authorization header');

    const token = authHeader.replace('Bearer ', '');
    const payload = this.jwt.isJwtTokenValid(token);

    if (!payload) throw new UnauthorizedException('Invalid token');

    ctx.getContext().user = payload;

    if (!this.allowedRoles.includes(payload.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
