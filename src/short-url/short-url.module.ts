import { Module } from '@nestjs/common';

import { AppLoggerPort } from '../shared/application-logger.service.port.ts';
import { LoggerModule } from '../shared/infrastructure/logger/logger.module.ts';
import { DatabaseModule } from '../shared/infrastructure/persistence/database.module.ts';
import { DatabaseClient } from '../shared/infrastructure/persistence/database-client.ts';
import { ResolveShortCodeUrlUseCase } from './application/use-cases/resolve-short-code-url.use-case.ts';
import { ShortenUrlUseCase } from './application/use-cases/shorten-url.use-case.ts';
import { ShortCodeRepositoryPort } from './domain/repositories/short-code.repository.port.ts';
import { UrlShortCodeGeneratorService } from './domain/services/url-short-code-generator.service.ts';
import { ShortCodeDbRepository } from './infrastructure/repositories/short-code.db.repository.ts';

@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [
    {
      provide: ShortCodeRepositoryPort,
      inject: [DatabaseClient],
      useFactory: (databaseClient: DatabaseClient) => {
        return new ShortCodeDbRepository(databaseClient);
      },
    },

    {
      provide: UrlShortCodeGeneratorService,
      inject: [],
      useFactory: () => {
        return new UrlShortCodeGeneratorService();
      },
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
      inject: [ShortCodeRepositoryPort],
      useFactory: (shortCodeRepository: ShortCodeRepositoryPort) => {
        return new ResolveShortCodeUrlUseCase(shortCodeRepository);
      },
    },
  ],
  exports: [ShortenUrlUseCase, ResolveShortCodeUrlUseCase],
})
export class ShortUrlModule {}
