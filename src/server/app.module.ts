// nest
import { Module, Request } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
// import { AngularUniversalModule } from './modules/angular-universal/angular-universal.module';
import { GraphQLModule } from '@nestjs/graphql';
import {UserEntity} from './modules/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mssql',
    name: 'sql',
    host: 'localhost',
    username: 'gong',
    password: 'G1971g',
    database: 'tipMan',
    domain: 'dfg',
    logging: false,
    entities: [ UserEntity, __dirname + '/modules/**/**.entity{.ts,.js}',

  ],
    synchronize: true,
    }), DatabaseModule, AuthModule, UserModule, GraphQLModule.forRoot({
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
