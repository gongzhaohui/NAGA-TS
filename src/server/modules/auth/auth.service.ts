import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: IUser): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    // const user: IJwtPayload = jwtPayload;
    if (!this.validateUser(user._key)) {
      return ;
    }
    const jwtPayload: IJwtPayload = {
      sub: user._key,
      roles: user.roles,
       };
    return this.jwtService.sign(jwtPayload);
  }

  async findUser(_key: string) {
    return await this.usersService.getByKey(_key);
  }
  async signUp(user: IUser): Promise<string> {
    const payload = await this.usersService.insertOne(user);
    return this.signIn(payload);
  }
  async validateUser(userKey: string): Promise<any> {
    return await this.usersService.getByKey(userKey);
  }
}
