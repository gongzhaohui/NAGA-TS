import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import {UserEntity} from '../user/user.entity';
import { Credentials } from '../user/dto/Credentials';
import { hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: Credentials): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    // const user: IJwtPayload = jwtPayload;
    const user: UserEntity = await this.usersService.findOneById(credentials._key);
    // console.log('user:' + JSON.stringify(user));
    // console.log('compare:' + compareSync(credentials.password, user.password));
    // console.log('passw:' + credentials.password);
    // const salt = user.password.substr(0, 29);
    // console.log('salt:' + salt);
    // console.log('newhash:' + hashSync(credentials.password, salt));
    if (!user || !compareSync(credentials.password, user.password)) {
      throw new UnauthorizedException();
    }
    const jwtPayload: IJwtPayload = {
      sub: user._key,
      roles: user.roles,
    };
    return this.createToken(jwtPayload);
  }
  async createToken(jwtPayload: IJwtPayload) {
    return this.jwtService.sign(jwtPayload);
  }

  async signUp(user: UserEntity): Promise<string> {
    // try {
      // console.log(user);

      const createdUser: UserEntity = await this.usersService.create(user);
      const payload: IJwtPayload = { sub: user._key, roles: createdUser.roles };
      return this.createToken(payload);
    // } catch {
    //   throw new NotAcceptableException('Can`t create user.');
    // }
  }
  async validateUser(payload: IJwtPayload): Promise<UserEntity> {
    // console.log('authserv-payload:' + payload);
    return await this.usersService.findOneById(payload.sub);
  }

  async changePassword(credentials: Credentials): Promise<string> {
    if (!credentials.email) {
      throw new UnauthorizedException('The email field is not provided.');
    }
    if (!credentials.password) {
      throw new UnauthorizedException('The password field is not provided.');
    }
    let user: UserEntity = await this.usersService.findOne({_key: credentials._key,
       email: credentials.email
      });
    if (!user) {
      throw new UnauthorizedException('The user key and email are not valid.');
    }
    if (user.password !== '' && !compareSync(credentials.password, user.password)) {
        throw new UnauthorizedException('The password of user is not correct.');
      }
    user = await this.usersService.patch(credentials._key, { password: credentials.newPassword });

    const jwtPayload: IJwtPayload = {
      sub: user._key,
      roles: user.roles,
    };
    return this.createToken(jwtPayload);
  }
  // todo logout...
  logOut(): void{
  }
}
