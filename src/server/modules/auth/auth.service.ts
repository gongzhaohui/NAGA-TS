import {Inject, Injectable} from '@nestjs/common';
import {Database, DocumentCollection} from 'arangojs';
// import { Model } from 'mongoose';
import {sign} from 'jsonwebtoken';
import {get, post, Response} from 'request';

import {SERVER_CONFIG, USER_MODEL_TOKEN} from '../../server.constants';
import {generateHashedPassword, generateSalt, } from '../../utilities/encryption';
import {IUser} from '../user/interfaces/user.interface';
import {UserService} from '../user/user.service';

import {IToken} from './interfaces/token.interface';

// import { IFacebookConfig } from './interfaces/facebook-config.interface';
// import { ITwitterConfig } from './interfaces/twitter-config.interface';
// import { IGoogleConfig } from './interfaces/google-config.interface';

@Injectable()
export class AuthService {
  private url: string;

  constructor(
    private readonly userService: UserService, // @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
  ) // @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: ITwitterConfig,
  // @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig
  {
    this.url = `${SERVER_CONFIG.httpProtocol}://${SERVER_CONFIG.domain}:${
      SERVER_CONFIG.httpPort
      }`;
  }

  async createToken(user: IUser): Promise<IToken> {
    const expiresIn: string = '48h';
    const token: string = sign(
      {
        sub: user._key,
        roles: user.roles,
      },
      SERVER_CONFIG.jwtSecret,
      { expiresIn },
    );

    return {
      token,
    };
  }

  async findUserById(_key: string): Promise<IUser> {
    return await this.userService.getByKey(_key);
  }
  async getUser(args: any): Promise<any> {
    return await this.userService.getByBindVars(args);
  }

  async signup( body: any
  ) {
    // 1
    const salt: string = generateSalt();
    const password = body.password;
    const hashedPassword = generateHashedPassword(salt, password);
    body.salt = salt;
    body.hashedPassword = hashedPassword;
    const user = await this.userService.insertOne(body);
    // 2
    console.log('body:' + JSON.stringify(body));
    console.log('user:' + JSON.stringify(user));
    // 3
    const token = this.createToken(body);

    // 4
    return {
      token,
      user,
    };
  }
   async signin(
args: any
  ) {
    // 1
    const user = await this.userService.getByBindVars(args);
    if (!user) {
      throw new Error('No such user found');
    }

    // 2
    const valid =
      generateHashedPassword(user.salt, args.password) === user.password;
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = this.createToken(user);

    // 3
    return {
      token,
      user,
    };
  }
}
