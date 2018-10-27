import { Database } from 'arangojs';
import { getConnection } from 'typeorm';
import {
  DB_CONNECTION_TOKEN,
  MSSQL_CONNECTION_TOKEN,
  SERVER_CONFIG,
} from '../../server.constants';

// import {Shared} from '@nestjs/core';
export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: () => {
      const db = new Database(SERVER_CONFIG.db.url);
      db.login(SERVER_CONFIG.db.username, SERVER_CONFIG.db.password);
      db.useDatabase(SERVER_CONFIG.db.dbname);
      return db;
    },
  },
  {
    provide: MSSQL_CONNECTION_TOKEN,
    useFactory: () => {
      // const dbConfig = SERVER_CONFIG.mssql;
      return  getConnection('sql');
    },
  },
];
