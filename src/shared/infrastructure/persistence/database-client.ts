import { sql } from 'drizzle-orm';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export class DatabaseClient<DbSchema extends Record<string, unknown> = any> {
  connection: NodePgDatabase<DbSchema>;

  async isConnected(): Promise<
    | {
        ok: true;
      }
    | {
        ok: false;
        error: unknown;
      }
  > {
    try {
      await this.connection.execute(sql`SELECT 1`);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async init({
    connectionString,
  }: {
    connectionString: string;
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
    const isConnectionStablishResult = await this.isConnected();
    if (!isConnectionStablishResult.ok) {
      throw new Error('Database connection failed', {
        cause: isConnectionStablishResult.error,
      });
    }
  }
}
