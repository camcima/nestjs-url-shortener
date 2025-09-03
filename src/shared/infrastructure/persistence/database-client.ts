import { sql } from 'drizzle-orm';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { environmentConfiguration } from '../environment.configuration';

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
      const connectionString = environmentConfiguration.DATABASE_URL;

      const pool = new Pool({
        connectionString,
        ssl: true,
      });
      this.connection = drizzle({
        client: pool,
        logger: false,
        casing: 'snake_case',
      });
      if (waitForConnection) {
        await this.checkSelf();
      }
    }
  }
}
