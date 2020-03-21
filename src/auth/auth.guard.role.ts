import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ROLES } from './auth.constants.roles';
import { User } from '../user/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}


  canActivate(context: ExecutionContext): boolean {
    const roles = Array.from(
      new Set([
        ...(this.reflector.get<ROLES[]>('roles', context.getClass()) || []),
        ...(this.reflector.get<ROLES[]>('roles', context.getHandler()) || []),
      ])
    );
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return roles.includes(user.role)
  }

}
