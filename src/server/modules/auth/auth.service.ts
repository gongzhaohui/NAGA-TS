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
import {DeepPartial} from 'typeorm';
import { IUser } from '../user/interfaces/user.interface';
import { Credentials } from '../user/dto/Credentials';
import { CreateUserDto } from '../user/dto/create.user.dto';
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
    if (!user || !compareSync(credentials.password, user.hashedPassword)) {
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
    // try {
      console.log(user);
      const dbUser = Object.assign(user, {
        hashedPassword: hashSync(user.password),
      });
      delete dbUser.password;
      const createdUser: UserEntity = await this.usersService.create(dbUser);
      const payload: IJwtPayload = { sub: user._key, roles: createdUser.roles };
      return this.createToken(payload);
    // } catch {
    //   throw new NotAcceptableException('Can`t create user.');
    // }
  }
  async validateUser(payload: IJwtPayload): Promise<UserEntity> {
    console.log('authserv-payload:' + payload);
    return await this.usersService.findOneById(payload.sub);
  }

  async updatePassword(credentials: Credentials): Promise<string> {
    if (!credentials.email) {
      throw new UnauthorizedException('The email field is not provided.');
    }
    if (!credentials.password) {
      throw new UnauthorizedException('The password field is not provided.');
    }
    let user: UserEntity = await this.usersService.findOne({_key: credentials._key,
       email: credentials.email,
       hashedPassword: hashSync(credentials.password)
      });
    if (!user) {
      throw new UnauthorizedException('The user key and email are not valid.');
    }
    user = await this.usersService.patch(credentials._key, { hashedPassword: hashSync(credentials.newPassword) });

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
