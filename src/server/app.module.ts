// nest
import { Module, Request } from '@nestjs/common';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
// import { AngularUniversalModule } from './modules/angular-universal/angular-universal.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    DatabaseModule, AuthModule, UserModule, GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      // context: ({ req}) => ({req}),
    }),
    // AngularUniversalModule.forRoot()
  ],
controllers: [],
})
export class ApplicationModule {
}
