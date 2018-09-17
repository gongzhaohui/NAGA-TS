import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
// import { Model } from 'mongoose';
import { use } from 'passport';
import { Strategy } from 'passport-local';

import { IUser } from '../../user/interfaces/user.interface';
import { generateHashedPassword, generateSalt } from '../../../utilities/encryption';
import { MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';
import {UserService } from '../../user/user.service';
@Injectable()
export class LocalStrategy {
  constructor(
     private readonly userService: UserService
  ) {
    this.init();
  }

  private init(): void {
    use('signup', new Strategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async (email: string, password: string, done: Function) => {
      try {
        if (await this.userService.findOne({ 'local.email': email })) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_EMAIL_IN_USE), false);
        }

        const salt: string = generateSalt();
        const user: IUser = new this.userService({
          method: 'local',
          roles: ['user'],
          local: {
            email,
            salt,
            hashedPassword: generateHashedPassword(salt, password)
          }
        });

        await user.save();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));

    use('signin', new Strategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async (email: string, password: string, done: Function) => {
      try {
        const user: IUser = await this.userService.findOne({ email });

        if (!user) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_EMAIL), false);
        }

        if (generateHashedPassword(user.salt, password) !== user.hashedPassword) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_PASSWORD), false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
  }
}
