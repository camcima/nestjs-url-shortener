import { Module } from '@nestjs/common';

import { DatabaseClient } from './database-client';

@Module({
  providers: [
    {
      provide: DatabaseClient,
      useFactory: async () => {
        const dbClient = new DatabaseClient();
        await dbClient.init({
          waitForConnection: true,
        });
        return dbClient;
      },
    },
  ],
  exports: [DatabaseClient],
})
export class DatabaseModule {}
