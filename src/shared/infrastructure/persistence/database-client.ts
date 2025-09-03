import { sql } from 'drizzle-orm';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

import { environmentConfiguration } from '../environment.configuration.ts';

export class DatabaseClient<DbSchema extends Record<string, unknown> = any> {
  connection: NodePgDatabase<DbSchema>;

  private async checkSelf(): Promise<void> {
    try {
      await this.connection.execute(sql`SELECT 1`);
    } catch (error) {
      throw new Error('Database connection failed', {
        cause: error,
      });
    }
  }

  async init({
    waitForConnection,
  }: {
    waitForConnection: boolean;
  }): Promise<void> {
    if (!this.connection) {
      this.connection = drizzle({
        casing: 'snake_case',
        connection: {
          connectionString: environmentConfiguration.DATABASE_URL,
          ssl: true,
        },
        logger: false,
      });
      if (waitForConnection) {
        await this.checkSelf();
      }
    }
  }
}
