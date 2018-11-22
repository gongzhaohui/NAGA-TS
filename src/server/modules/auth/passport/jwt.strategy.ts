import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { SERVER_CONFIG } from '../../../server.constants';
import { IUser } from '../../user/interfaces/user.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import {UserEntity} from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy
(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SERVER_CONFIG.jwtSecret,
      passReqToCallback: true,
    });
  }

  public async validate(payload: IJwtPayload) {
    // console.log('payload:' + payload.sub);
    // console.log('logininfo:' + JSON.stringify(longinUser));
    const user: UserEntity = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
