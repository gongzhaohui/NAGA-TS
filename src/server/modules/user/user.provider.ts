import { Database } from 'arangojs';
// import { UserSchema } from './schemas/user.schema';
import { USER_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const userProviders = [
  {
    provide: USER_MODEL_TOKEN,
    useFactory: (db: Database) => db.collection('users'),
    inject: [DB_CONNECTION_TOKEN],
  },
];
