import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { HealthRestApiModule } from '../../health/presentation/rest-api/health-rest-api.module.js';
import { TelemetryModule } from '../../shared/infrastructure/telemetry/telemetry.module.js';
import { CatchAllExceptionsForHttp } from '../../shared/presentation/rest-api/middlewares/catch-all-exceptions.filter';
import { JsonBodyParserMiddleware } from '../../shared/presentation/rest-api/middlewares/json-body-parser.middleware';
import { UrlEncodedParserMiddleware } from '../../shared/presentation/rest-api/middlewares/url-encoded-parser.middleware';
import { ShortUrlRestApiModule } from '../../short-url/presentation/rest-api/short-url-rest-api.module';

@Module({
  imports: [TelemetryModule, HealthRestApiModule, ShortUrlRestApiModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: CatchAllExceptionsForHttp,
    },
  ],
})
export class RestApiAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(JsonBodyParserMiddleware, UrlEncodedParserMiddleware)
      .forRoutes('*');
  }
}
