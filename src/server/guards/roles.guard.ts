import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SERVER_CONFIG} from '../server.constants';
import{} from '../modules/auth/'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector = new Reflector()) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log('rolse:' + roles);
    const CircularJSON = require('circular-json');
    if (!roles) { return true; }
    const request = context.switchToHttp().getRequest();

    let user = request.user;
    if (!user) {
      user=a
    }

    // // console.log('context:' + CircularJSON.stringify(context));
    // console.log('req:' + CircularJSON.stringify(request));
    // console.log('user:' + JSON.stringify(request.user));
    // // console.log(user);
    const hasRole = () =>
      user.roles.some((userRole: string) =>
        roles.some(role => userRole === role),
      );
    if (roles && roles.length > 0) {
      return user && user.roles && hasRole();
    }
    return true;
  }
}
