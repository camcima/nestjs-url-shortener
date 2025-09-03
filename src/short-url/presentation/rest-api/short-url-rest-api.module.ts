import { Module } from '@nestjs/common';

import { LoggerModule } from '../../../shared/infrastructure/logger/logger.module';
import { ShortUrlModule } from '../../short-url.module';
import { ResolveShortCodeController } from './controllers/resolve-short-code.controller';
import { ShortenUrlController } from './controllers/shorten-url.controller';

@Module({
  imports: [LoggerModule, ShortUrlModule],
  controllers: [ShortenUrlController, ResolveShortCodeController],
})
export class ShortUrlRestApiModule {}
