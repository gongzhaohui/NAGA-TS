import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { SERVER_CONFIG } from '../../../server.constants';
import { IUser } from '../../user/interfaces/user.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { LoginUserDto } from '../../user/dto/login.user.dto';
import {UserEntity} from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy
(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SERVER_CONFIG.jwtSecret,
      // passReqToCallback: true,
    });
  }

  public async validate(payload: IJwtPayload) {
    const longinUser: LoginUserDto = {
      _key: payload.sub,
      password: ''
    };
    // console.log('payload:' + payload.sub);
    // console.log('logininfo:' + JSON.stringify(longinUser));
    const user: UserEntity = await this.authService.validateUser(longinUser);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
