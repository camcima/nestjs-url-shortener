import { Module } from '@nestjs/common';

import { ShortUrlModule } from '../../short-url.module.ts';
import { ResolveShortCodeController } from './controllers/resolve-short-code.controller.ts';
import { ShortenUrlController } from './controllers/shorten-url.controller.ts';

@Module({
  imports: [ShortUrlModule],
  controllers: [ShortenUrlController, ResolveShortCodeController],
})
export class ShortUrlRestApiModule {}
