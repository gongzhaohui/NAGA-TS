import { Database } from 'arangojs';
import {Connection} from 'typeorm';
// import { UserSchema } from './schemas/user.schema';
import { USER_MODEL_TOKEN, USER_MODEL_TOKEN_MSSQL, DB_CONNECTION_TOKEN , MSSQL_CONNECTION_TOKEN} from '../../server.constants';
import {UserEntity} from './user.entity';

export const userProviders = [
  {
    provide: USER_MODEL_TOKEN_MSSQL,
    useFactory: (connection: Connection) =>  connection.getRepository(UserEntity),
    inject: [MSSQL_CONNECTION_TOKEN],
  },
  // {
  //   provide: USER_MODEL_TOKEN,
  //   useFactory: (db: Database) =>  db.collection('users'),
  //   inject: [DB_CONNECTION_TOKEN],
  // },
];
