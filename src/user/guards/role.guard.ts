import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get('roles', context.getHandler());

    const { user } = context.switchToHttp().getRequest();

    if (roles.some((role: string) => role == user.role)) {
      return true;
    }

    return false;
  }
}
