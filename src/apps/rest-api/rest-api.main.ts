import { Logger as NestLogger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { environmentConfiguration } from '../../shared/infrastructure/environment.configuration';
import { loadTracingIntoProcess } from '../../shared/infrastructure/telemetry/tracing-loader';
import { loadSwaggerForNestjsApp } from '../../shared/presentation/rest-api/documentation/open-api-loader';
import { RestApiAppModule } from './rest-api-app.module';

async function bootstrap() {
  loadTracingIntoProcess();

  const app = await NestFactory.create<NestExpressApplication>(
    RestApiAppModule,
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));

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

// Only run bootstrap if this file is executed directly (not imported)
if (require.main === module) {
  bootstrap().catch((err) => {
    const logger = new NestLogger('bootstrap');
    logger.error('Failed to start application:', err);
    process.exit(1);
  });
}
