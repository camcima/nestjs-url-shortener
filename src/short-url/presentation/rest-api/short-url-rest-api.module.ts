import { Module } from '@nestjs/common';

import { ShortUrlModule } from '../../short-url.module';
import { ResolveShortCodeController } from './controllers/resolve-short-code.controller';
import { ShortenUrlController } from './controllers/shorten-url.controller';

@Module({
  imports: [ShortUrlModule],
  controllers: [ShortenUrlController, ResolveShortCodeController],
})
export class ShortUrlRestApiModule {}
