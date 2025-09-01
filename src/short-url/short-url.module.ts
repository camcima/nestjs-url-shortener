import { Module } from '@nestjs/common';

import { DatabaseModule } from '../shared/infrastructure/persistence/database.module.ts';
import { DatabaseClient } from '../shared/infrastructure/persistence/database-client.ts';
import { ShortenUrlUseCase } from './application/use-cases/shorten-url.use-case.ts';
import { IShortCodeRepository } from './domain/repositories/short-code.repository.port.ts';
import { UrlShortCodeGeneratorService } from './domain/services/url-short-code-generator.service.ts';
import { ShortCodeDbRepository } from './infrastructure/repositories/short-code.db.repository.ts';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: IShortCodeRepository,
      inject: [DatabaseClient],
      useFactory: (databaseClient: DatabaseClient) => {
        return new ShortCodeDbRepository(databaseClient);
      },
    },
    {
      provide: UrlShortCodeGeneratorService,
      useClass: UrlShortCodeGeneratorService,
    },
    {
      provide: ShortenUrlUseCase,
      inject: [IShortCodeRepository, UrlShortCodeGeneratorService],
      useFactory: (
        shortCodeRepository: IShortCodeRepository,
        urlShortCodeGeneratorService: UrlShortCodeGeneratorService,
      ) =>
        new ShortenUrlUseCase(
          shortCodeRepository,
          urlShortCodeGeneratorService,
        ),
    },
  ],
  exports: [ShortenUrlUseCase],
})
export class ShortUrlModule {}
