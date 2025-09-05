import { Module } from '@nestjs/common';

import { LoggerModule } from '../../../shared/infrastructure/logger/logger.module';
import { ShortUrlModule } from '../../short-url.module';
import { ResolveShortCodeCommand } from './commands/resolve-short-code/resolve-short-code.command';

@Module({
  imports: [ShortUrlModule, LoggerModule],
  providers: [ResolveShortCodeCommand],
})
export class ShortUrlCliModule {}
