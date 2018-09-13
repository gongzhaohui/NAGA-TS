<<<<<<< HEAD
// import './polyfills';
=======
import './polyfills';
>>>>>>> original

import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import * as e from 'express';

import { ApplicationModule } from './app.module';
import { SERVER_CONFIG } from './server.constants';

declare const module: any;

async function bootstrap() {
  const express: any = e();

  if (process.env.NODE_ENV === 'production') {
    enableProdMode();
  }

  require('./config/index')(SERVER_CONFIG, express);

<<<<<<< HEAD
  const app = await NestFactory.create(
    ApplicationModule,
    express,
     {
    logger: true,
  });
=======
  const app = await NestFactory.create(ApplicationModule, express);
>>>>>>> original

  app.enableCors();

  await app.listen(SERVER_CONFIG.httpPort);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
