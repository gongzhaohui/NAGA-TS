import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector= new Reflector()) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    const request = context.switchToHttp().getRequest();
    const user = request.user || request.body.user;
    const hasRole = () => user.roles.some(
        (userRole: string) => roles.some((role) => userRole === role));
    if (roles && roles.length > 0) {
      return user && user.roles && hasRole();
    }
    return true;
  }
}
