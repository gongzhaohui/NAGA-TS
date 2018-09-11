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
