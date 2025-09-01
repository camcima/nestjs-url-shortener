import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { CatchAllExecptions } from '../../shared/presentation/rest-api/middlewares/catch-all-exceptions.filter.ts';
import { JsonBodyParserMiddleware } from '../../shared/presentation/rest-api/middlewares/json-body-parser.middleware.ts';
import { UrlEncodedParserMiddleware } from '../../shared/presentation/rest-api/middlewares/url-encoded-parser.middleware.ts';
import { ShortUrlRestApiModule } from '../../short-url/presentation/rest-api/short-url-rest-api.module.ts';

@Module({
  imports: [ShortUrlRestApiModule],
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
      useClass: CatchAllExecptions,
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
