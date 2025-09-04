import { Module } from '@nestjs/common';
import { HealthIndicatorService, TerminusModule } from '@nestjs/terminus';

import { AppLoggerPort } from '../shared/application-logger.service.port';
import { LoggerModule } from '../shared/infrastructure/logger/logger.module';
import { DatabaseModule } from '../shared/infrastructure/persistence/database.module';
import { DatabaseClient } from '../shared/infrastructure/persistence/database-client';
import { DatabaseHealthIndicatorService } from './domain/services/database-health-indicator.service';

@Module({
  imports: [LoggerModule, DatabaseModule, TerminusModule],
  providers: [
    {
      provide: DatabaseHealthIndicatorService,
      inject: [AppLoggerPort, DatabaseClient, HealthIndicatorService],
      useFactory: (
        appLogger: AppLoggerPort,
        databaseClient: DatabaseClient,
        healthIndicatorService: HealthIndicatorService,
      ) => {
        return new DatabaseHealthIndicatorService(
          appLogger,
          databaseClient,
          healthIndicatorService,
        );
      },
    },
  ],
  exports: [TerminusModule, DatabaseHealthIndicatorService],
})
export class HealthModule {}
