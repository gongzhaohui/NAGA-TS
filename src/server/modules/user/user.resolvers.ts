import { ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Context,
  Info,
  Root,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { root } from 'rxjs/internal/util/root';

const pubSub = new PubSub();

@Resolver('user')
export class UserResolvers {
  constructor(private readonly userService: UserService) {}

  @Query()
  @UseGuards(GqlAuthGuard)
  async getUsers(
    @Root() root: any,
    @Args() args: any,
    @Context() ctx: any,
    @Info() info: any,
  ) {
    return await this.userService.getAll({});
  }

  @Query('user')
  async getByKey(
    @Root() root: any,
    @Args() args: any,
    @Context() ctx: any,
    @Info() info: any,
  ): Promise<any> {
    // console.log('userkey:' + _key);
    const _key = args('_key');
    return await this.userService.getByKey(_key);
  }

  @Mutation('createUser')
  async create(
    @Root() root: any,
    @Args() args: any,
    @Context() ctx: any,
    @Info() info: any,
  ): Promise<any> {
    const createdUser = await this.userService.insertOne(args.body);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }
  @Mutation('signin')
  async signin(
    @Root() root: any,
    @Args() args: any,
    @Context() ctx: any,
    @Info() info: any,
  ) {}
  @Mutation('signup')
  async signup(
    @Root() root: any,
    @Args() args: any,
    @Context() ctx: any,
    @Info() info: any,
  ) {}
  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('userCreated'),
    };
  }
}
