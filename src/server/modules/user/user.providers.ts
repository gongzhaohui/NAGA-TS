// import { Connection } from 'mongoose';
// import { UserSchema } from './schemas/user.schema';
import { Database } from 'arangojs';
import { USER_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';
import { DatabaseModule } from '../database/database.module';

export const userProviders = [
  {
    provide: USER_MODEL_TOKEN,
    useFactory: (db: Database) => db.collection('users'),
    inject: [DB_CONNECTION_TOKEN],
  },
];
