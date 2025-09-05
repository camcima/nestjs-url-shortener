import { Module } from '@nestjs/common';

import { environmentConfiguration } from '../environment.configuration';
import { DatabaseClient } from './database-client';

@Module({
  providers: [
    {
      provide: DatabaseClient,
      useFactory: async () => {
        const dbClient = await DatabaseClient.init({
          connectionString: environmentConfiguration.DATABASE_URL,
        });
        return dbClient;
      },
    },
  ],
  exports: [DatabaseClient],
})
export class DatabaseModule {
  constructor(private readonly databaseClient: DatabaseClient) {}

  async onModuleDestroy() {
    await this.databaseClient.closeConnection();
  }
}
