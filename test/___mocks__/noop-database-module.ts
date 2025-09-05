import { Module } from '@nestjs/common';

import { DatabaseClient } from '../../src/shared/infrastructure/persistence/database-client';

@Module({
  providers: [
    {
      provide: DatabaseClient,
      useFactory: () => {
        return vi.fn();
      },
    },
  ],
  exports: [DatabaseClient],
})
export class NoopDatabaseModuleMock {}
