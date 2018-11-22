import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolvers } from './user.resolvers';
import { userProviders } from './user.providers';
import {UserEntity} from './user.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService, UserResolvers],
  exports: [UserService],
})
export class UserModule {
}
