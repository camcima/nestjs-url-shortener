import { Module } from '@nestjs/common';

import { ShortUrlCliModule } from '../../short-url/presentation/cli/short-url-cli.module';

@Module({
  imports: [ShortUrlCliModule],
})
export class CliAppModule {}
