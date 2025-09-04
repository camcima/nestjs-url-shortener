import { sql } from 'drizzle-orm';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

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
    connectionString,
    waitForConnection,
  }: {
    connectionString: string;
    waitForConnection: boolean;
  }): Promise<void> {
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
