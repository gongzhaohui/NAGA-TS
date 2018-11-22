import { Database } from 'arangojs';
import { createConnection, getConnection, Connection } from 'typeorm';
import {
  DB_CONNECTION_TOKEN,
  MSSQL_CONNECTION_TOKEN,
  SERVER_CONFIG,
} from '../../server.constants';
import { connect } from 'net';
// import {Config} from '../../config/config';

// import {Shared} from '@nestjs/core';
export const databaseProviders = [
  // {
  //   provide: DB_CONNECTION_TOKEN,
  //   useFactory: () => {
  //     const db = new Database(SERVER_CONFIG.db.url);
  //     db.login(SERVER_CONFIG.db.username, SERVER_CONFIG.db.password);
  //     db.useDatabase(SERVER_CONFIG.db.dbname);
  //     return db;
  //   },
  // },
  {
    provide: MSSQL_CONNECTION_TOKEN,
    useFactory: async () => await createConnection({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'it08',
      password: 'G1971g',
      database: 'test',
      domain: 'dfg',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
