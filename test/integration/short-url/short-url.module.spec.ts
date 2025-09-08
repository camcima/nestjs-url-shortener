import { Test } from '@nestjs/testing';

import { DatabaseModule } from '../../../src/shared/infrastructure/persistence/database.module';
import { ShortUrlModule } from '../../../src/short-url/short-url.module';
import { NoopDatabaseModuleMock } from '../../___mocks___/noop-database-module';

describe('ShortUrlModule (without database connection)', () => {
  test('should be inialized with no dependencies errors', async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ShortUrlModule],
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
