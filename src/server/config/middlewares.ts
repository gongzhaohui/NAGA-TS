import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { Application } from 'express';

import { IEnvironmentConfig } from './config';

module.exports = (config: IEnvironmentConfig, app: Application) => {
  // app.use(cookieParser());

  app.use(json());
  app.use(urlencoded({ extended: true }));
};
