import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  UnauthorizedException,
  NotAcceptableException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { IUser } from '../user/interfaces/user.interface';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { hashSync, compareSync } from 'bcryptjs';

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
    if (!user || !compareSync(loginUser.password, user.hashedPassword)) {
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

  async signUp(user: CreateUserDto): Promise<string> {
    try {
      const dbUser = Object.assign(user, {
        hashedPassword: hashSync(user.password),
      });
      delete dbUser.password;
      const createdUser: IUser = await this.usersService.insertOne(dbUser);
      const payload: IJwtPayload = { sub: user._key, roles: createdUser.roles };
      return this.createToken(payload);
    } catch {
      throw new NotAcceptableException('Can`t create user.');
    }
  }
  async validateUser(loginUser: LoginUserDto): Promise<IUser> {
    const bindVars = Object.assign({}, loginUser);
    delete bindVars.password;
    return await this.usersService.getByBindVars(bindVars);
  }

  async updatePassword(loginUser: LoginUserDto): Promise<string> {
    if (!loginUser.email) {
      throw new UnauthorizedException('The email field is not provided.');
    }
    if (!loginUser.password) {
      throw new UnauthorizedException('The password field is not provided.');
    }
    let user: IUser = await this.validateUser(loginUser);
    if (!user) {
      throw new UnauthorizedException('The user key and email are not valid.');
    }
    user = await this.usersService.updateBykey(loginUser._key, { hashedPassword: hashSync(loginUser.password) });

    const jwtPayload: IJwtPayload = {
      sub: user._key,
      roles: user.roles,
    };
    return this.createToken(jwtPayload);
  }
  // todo cleanup session...
  logOut(): void{
  }
}
