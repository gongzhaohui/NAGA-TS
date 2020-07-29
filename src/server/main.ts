import './polyfills';

import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as e from 'express';
import { AppModule } from './app.module';
import { RolesGuard } from './guards/roles.guard';
import { SERVER_CONFIG } from './server.constants';
import { AuthGuard } from '@nestjs/passport';
import * as helmet from 'helmet';
declare const module: any;

async function bootstrap() {
  const express: any = e();

  if (process.env.NODE_ENV === 'production') {
    enableProdMode();
  }

  // require('./config/index')(SERVER_CONFIG, express);
  // console.log('config:' + JSON.stringify(SERVER_CONFIG));
  // console.log(__dirname);
  const app = await NestFactory.create(
    AppModule,
    // express,
    //  {
    // logger: true,
    // }
  );
  app.use(helmet());
  app.enableCors();
  // app.useGlobalGuards(new (AuthGuard('jwt'))());

  const options = new DocumentBuilder()
    .setTitle('NAGA-TS Api')
    .setDescription('The NAGA-TS API description')
    .setVersion('0.1')
    .addTag('NAGA')
    // .addBearerAuth('authorization', 'header')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalGuards(new RolesGuard());
  await app.listen(SERVER_CONFIG.httpPort);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
