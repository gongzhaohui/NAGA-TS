<<<<<<< HEAD
import { SERVER_CONFIG, DB_CONNECTION_TOKEN } from '../../server.constants';
import { Database } from 'arangojs';
export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: () => {
      const db = new Database(SERVER_CONFIG.db);
      db.useBasicAuth(SERVER_CONFIG.db.user, SERVER_CONFIG.db.password);
      db.useDatabase(SERVER_CONFIG.db.databasename);
      return db;
    },
  },
];
=======
import {Database} from 'arangojs';

import {DB_CONNECTION_TOKEN, SERVER_CONFIG} from '../../server.constants';

// import {Shared} from '@nestjs/core';
export const databaseProviders = [{
  provide: DB_CONNECTION_TOKEN,
  useFactory: () => {
    const db = new Database(SERVER_CONFIG.db.url);
    // console.log('arangourl:' + SERVER_CONFIG.db.url);
    // console.log('db:' + JSON.stringify(db));
    db.login(
        SERVER_CONFIG.db.username, SERVER_CONFIG.db.password);
    db.useDatabase(SERVER_CONFIG.db.dbname);
    return db;
  }
}];
>>>>>>> original
