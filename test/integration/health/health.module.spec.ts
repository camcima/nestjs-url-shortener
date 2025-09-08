import { Test } from '@nestjs/testing';

import { HealthModule } from '../../../src/health/health.module';
import { DatabaseModule } from '../../../src/shared/infrastructure/persistence/database.module';
import { NoopDatabaseModuleMock } from '../../__mocks__/noop-database-module';

describe('HealthModule (without database connection)', () => {
  test('should be inialized with no dependencies errors', async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [HealthModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(NoopDatabaseModuleMock)
      .compile();

    const app = moduleFixture.createNestApplication();

    expect(app).toBeDefined();
    await expect(app.init()).resolves.not.toThrow();

    // tear down
    await app.close();
  });
});
