import { Module } from '@nestjs/common';

import { LoggerModule } from '../../../shared/infrastructure/logger/logger.module.ts';
import { ShortUrlModule } from '../../short-url.module.ts';
import { ResolveShortCodeController } from './controllers/resolve-short-code.controller.ts';
import { ShortenUrlController } from './controllers/shorten-url.controller.ts';

@Module({
  imports: [LoggerModule, ShortUrlModule],
  controllers: [ShortenUrlController, ResolveShortCodeController],
})
export class ShortUrlRestApiModule {}
