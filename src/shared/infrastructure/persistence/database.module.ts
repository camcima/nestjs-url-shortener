import { Module } from '@nestjs/common';

import { environmentConfiguration } from '../environment.configuration';
import { DatabaseClient } from './database-client';

@Module({
  providers: [
    {
      provide: DatabaseClient,
      useFactory: async () => {
        const dbClient = new DatabaseClient();
        await dbClient.init({
          connectionString: environmentConfiguration.DATABASE_URL,
          waitForConnection: true,
        });
        return dbClient;
      },
    },
  ],
  exports: [DatabaseClient],
})
export class DatabaseModule {}
