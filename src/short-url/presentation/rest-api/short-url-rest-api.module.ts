import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';

import { JsonBodyParserMiddleware } from '../../../shared/presentation/rest-api/middlewares/json-body-parser.middleware.ts';
import { UrlEncodedParserMiddleware } from '../../../shared/presentation/rest-api/middlewares/url-encoded-parser.middleware.ts';
import { ShortUrlModule } from '../../short-url.module.ts';
import { ResolveShortCodeController } from './controllers/resolve-short-code.controller.ts';
import { ShortenUrlController } from './controllers/shorten-url.controller.ts';

@Module({
  imports: [ShortUrlModule],
  controllers: [ShortenUrlController, ResolveShortCodeController],
})
export class ShortUrlRestApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(JsonBodyParserMiddleware, UrlEncodedParserMiddleware)
      .forRoutes('*');
  }
}
