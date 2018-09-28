import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUser } from '../user/interfaces/user.interface';
import { LoginUserDto } from '../user/dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginUser: LoginUserDto): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    // const user: IJwtPayload = jwtPayload;
    const user: IUser = await this.validateUser(loginUser);
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwtPayload: IJwtPayload = {
      sub: user._key,
      password: '',
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
  async validateUser(loginUser: LoginUserDto): Promise<IUser> {
    const userKey = loginUser._key;
    return await this.usersService.getByKey(userKey);
  }
}
