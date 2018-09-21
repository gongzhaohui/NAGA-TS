import {
  Args,
  Context,
  Info,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';

import { AuthService } from './auth.service';
@Resolver('auth')
export class AuthResolvers {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation('signup')
  async signup(
    @Root() root: any,
    @Args() args: any,
    @Context() ctx: any,
    @Info() info: any,
  ) {
    // 1
    const body = args.body;
       // 3
    return await this.authService.signUp(body);
  }
  @Mutation('signin')
  async login(
    @Root() root: any,
    @Args() args: any,
    @Context() ctx: any,
    @Info() info: any,
  ) {
    return await this.authService.signIn(args);
  }
}
