import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

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
  ],
})
export class RestApiAppModule {}
