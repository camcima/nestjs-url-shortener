import { Module } from '@nestjs/common';

import { AppLoggerPort } from '../shared/app-logger.port';
import { LoggerModule } from '../shared/infrastructure/logger/logger.module';
import { DatabaseModule } from '../shared/infrastructure/persistence/database.module';
import { DatabaseClient } from '../shared/infrastructure/persistence/database-client';
import { ResolveShortCodeUrlUseCase } from './application/use-cases/resolve-short-code-url.use-case';
import { ShortenUrlUseCase } from './application/use-cases/shorten-url.use-case';
import { ShortCodeRepositoryPort } from './domain/repositories/short-code.repository.port';
import { UrlShortCodeGeneratorService } from './domain/services/url-short-code-generator.service';
import { ShortCodeRepository } from './infrastructure/repositories/short-code.db.repository';

@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [
    {
      provide: ShortCodeRepositoryPort,
      inject: [DatabaseClient],
      useFactory: (databaseClient: DatabaseClient) => {
        return new ShortCodeRepository(databaseClient);
      },
    },

    {
      provide: UrlShortCodeGeneratorService,
      useClass: UrlShortCodeGeneratorService,
    },
    {
      provide: ShortenUrlUseCase,
      inject: [
        AppLoggerPort,
        ShortCodeRepositoryPort,
        UrlShortCodeGeneratorService,
      ],
      useFactory: (
        appLogger: AppLoggerPort,
        shortCodeRepository: ShortCodeRepositoryPort,
        urlShortCodeGeneratorService: UrlShortCodeGeneratorService,
      ) => {
        appLogger.setContext(ShortenUrlUseCase.name);

        return new ShortenUrlUseCase(
          appLogger,
          shortCodeRepository,
          urlShortCodeGeneratorService,
        );
      },
    },
    {
      provide: ResolveShortCodeUrlUseCase,
      useClass: ResolveShortCodeUrlUseCase,
    },
  ],
  exports: [ShortenUrlUseCase, ResolveShortCodeUrlUseCase],
})
export class ShortUrlModule {}
