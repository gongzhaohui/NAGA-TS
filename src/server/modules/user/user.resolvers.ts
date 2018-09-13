import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
<<<<<<< HEAD
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
    return await this.userService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('_key', ParseIntPipe)
    id: number,
  ): Promise<IUser> {
    return await this.userService.getUserByKey(_key);
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
=======
import { CatsGuard } from './cats.guard';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolvers {
  constructor(private readonly catsService: CatsService) {}

  @Query()
  @UseGuards(CatsGuard)
  async getCats() {
    return await this.catsService.findAll();
  }

  @Query('cat')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Cat> {
    return await this.catsService.findOneById(id);
  }

  @Mutation('createCat')
  async create(@Args() args: Cat): Promise<Cat> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('catCreated'),
>>>>>>> original
    };
  }
}
