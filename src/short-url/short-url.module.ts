import { Module } from '@nestjs/common';

import { IAppLogger } from '../shared/application-logger.service.port.ts';
import { LoggerModule } from '../shared/infrastructure/logger/logger.module.ts';
import { DatabaseModule } from '../shared/infrastructure/persistence/database.module.ts';
import { DatabaseClient } from '../shared/infrastructure/persistence/database-client.ts';
import { ResolveShortCodeUrlUseCase } from './application/use-cases/resolve-short-code-url.use-case.ts';
import { ShortenUrlUseCase } from './application/use-cases/shorten-url.use-case.ts';
import { IShortCodeRepository } from './domain/repositories/short-code.repository.port.ts';
import { UrlShortCodeGeneratorService } from './domain/services/url-short-code-generator.service.ts';
import { ShortCodeDbRepository } from './infrastructure/repositories/short-code.db.repository.ts';

@Module({
  imports: [LoggerModule, DatabaseModule],
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
      inject: [IAppLogger, IShortCodeRepository, UrlShortCodeGeneratorService],
      useFactory: (
        appLogger: IAppLogger,
        shortCodeRepository: IShortCodeRepository,
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
      inject: [IShortCodeRepository],
      useFactory: (shortCodeRepository: IShortCodeRepository) =>
        new ResolveShortCodeUrlUseCase(shortCodeRepository),
    },
  ],
  exports: [ShortenUrlUseCase, ResolveShortCodeUrlUseCase],
})
export class ShortUrlModule {}
