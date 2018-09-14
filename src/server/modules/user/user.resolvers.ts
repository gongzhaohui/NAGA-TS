import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CtxGuard } from '../../guards/ctx.guard';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';

const pubSub = new PubSub();

@Resolver('user')
export class UsersResolvers {
  constructor(private readonly userService: UserService) {}

  @Query()
  @UseGuards(CtxGuard)
  async getUsers() {
    return await this.userService.getAll();
  }

  @Query('user')
  async findOneById(
    @Args('_key', ParseIntPipe)
    id: number,
  ): Promise<IUser> {
    return await this.userService.getByKey(_key);
  }

  @Mutation('createUser')
  async create(@Args() args: User): Promise<User> {
    const createdUser = await this.usersService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('userCreated'),
    };
  }
}
