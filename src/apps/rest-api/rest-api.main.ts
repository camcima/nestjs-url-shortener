import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { environmentConfiguration } from '../../shared/infrastructure/environment.configuration.ts';
import { loadSwaggerForNestjsApp } from '../../shared/presentation/rest-api/documentation/open-api-loader.ts';
import { RestApiAppModule } from './rest-api-app.module.ts';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    RestApiAppModule,
    {},
  );

  app.enableShutdownHooks();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  app.disable('x-powered-by');
  app.enableCors();
  loadSwaggerForNestjsApp(app);

  await app.listen(environmentConfiguration.REST_API_APP_PORT);
}
void bootstrap();
