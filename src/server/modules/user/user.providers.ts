<<<<<<< HEAD
// import { Connection } from 'mongoose';
// import { UserSchema } from './schemas/user.schema';
import { Database } from 'arangojs';
import { USER_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';
import { DatabaseModule } from '../database/database.module';
=======
import { Database } from 'arangojs';
// import { UserSchema } from './schemas/user.schema';
import { USER_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';
>>>>>>> original

export const userProviders = [
  {
    provide: USER_MODEL_TOKEN,
<<<<<<< HEAD
    useFactory: (db: Database) => db.collection('users'),
=======
    useFactory: (db: Database) =>  db.collection('users'),
>>>>>>> original
    inject: [DB_CONNECTION_TOKEN],
  },
];
