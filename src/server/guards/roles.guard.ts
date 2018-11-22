import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  // constructor(private readonly reflector: Reflector = new Reflector()) {
  //   super();
  // }
  async canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const reflector: Reflector = new Reflector();
    const roles = reflector.get<string[]>('roles', context.getHandler());
    if (roles && roles.length > 0) {
      const isValidUser = await super.canActivate(context);
      // console.log('isvalid:' + JSON.stringify (isValidUser));
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      // console.log('user:' + JSON.stringify(request.user));

      const hasRole = () =>
        user.roles.some((userRole: string) =>
          roles.some(role => userRole === role || userRole === 'admin'),
        );

      return isValidUser && user && user.roles && hasRole();
    }
    return true;
  }
}
