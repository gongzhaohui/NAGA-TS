import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
// import { Model } from 'mongoose';
import { use } from 'passport';
import { Strategy } from 'passport-local';

import { IUser } from '../../user/interfaces/user.interface';
import {
  generateHashedPassword,
  generateSalt,
} from '../../../utilities/encryption';
import { MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';
import { UserService } from '../../user/user.service';
import { async } from 'rxjs/internal/scheduler/async';
@Injectable()
export class LocalStrategy {
  constructor(private readonly userService: UserService) {
    this.init();
  }

  private init(): void {
    use(
      'signup',
      new Strategy(
        {
          usernameField: '_key',
          passwordField: 'password',
        },
        async (
          req: Express.Request,
          _key: string,
          password: string,
          done: Function,
        ) => {
          try {
            if (await this.userService.getByKey(user._key)) {
              return done(
                new UnauthorizedException(MESSAGES.UNAUTHORIZED_USER_IN_USE),
                false,
              );
            }

            const salt: string = generateSalt();
            const user: IUser = {
              _key,
              name: _key,
              roles: 'user',
              email,
              gender,
              title,
              birthed,
              salt,
              hashedPassword: generateHashedPassword(salt, password),
            };

            await this.userService.insertOne(user);

            done(null, user);
          } catch (error) {
            done(error, false);
          }
        },
      ),
    );

    use(
      'signin',
      new Strategy(
        {
          usernameField: '_key',
          passwordField: 'password',
        },
        async (_key: string, password: string, done: Function) => {
          try {
            const user: IUser = await this.userService.getByKey(_key);

            if (!user) {
              return done(
                new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_USER),
                false,
              );
            }

            if (
              generateHashedPassword(user.salt, password) !==
              user.hashedPassword
            ) {
              return done(
                new UnauthorizedException(
                  MESSAGES.UNAUTHORIZED_INVALID_PASSWORD,
                ),
                false,
              );
            }

            done(null, user);
          } catch (error) {
            done(error, false);
          }
        },
      ),
    );
  }
}
