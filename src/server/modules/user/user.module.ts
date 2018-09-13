import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
<<<<<<< HEAD
import { userProviders } from './user.providers';
=======
import {userProviders} from './user.providers';
>>>>>>> original
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
<<<<<<< HEAD
  providers: [
    ...userProviders,
    UserService,
  ],
  exports: [
    ...userProviders
  ]
})
export class UserModule {}
=======
  providers: [...userProviders, UserService],
  exports: [
    ...userProviders,
  ],
})
export class UserModule {
}
>>>>>>> original
