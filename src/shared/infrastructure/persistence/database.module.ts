import { Module } from '@nestjs/common';

import { environmentConfiguration } from '../environment.configuration';
import { DatabaseClient } from './database-client';

@Module({
  providers: [
    {
      provide: DatabaseClient,
      useFactory: async () => {
        const dbClient = await DatabaseClient.init({
          connectionParams: {
            host: environmentConfiguration.DB_HOST,
            user: environmentConfiguration.DB_USER,
            password: environmentConfiguration.DB_PASSWORD,
            port: environmentConfiguration.DB_PORT,
            database: environmentConfiguration.DB_NAME,
          },
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
