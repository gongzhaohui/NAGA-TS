import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
// import {userProviders} from './user.providers';
import { UserService } from './user.service';
import { UserResolvers } from './user.resolvers';
// import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserResolvers],
  exports: [],
})
export class UserModule {}
