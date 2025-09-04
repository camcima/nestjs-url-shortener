import { sql } from 'drizzle-orm';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export class DatabaseClient<DbSchema extends Record<string, unknown> = any> {
  connection: NodePgDatabase<DbSchema>;

  private constructor() {}

  async isConnected(): Promise<
    | {
        ok: true;
      }
    | {
        ok: false;
        error: unknown;
      }
  > {
    if (!this.connection) {
      return {
        ok: false,
        error: new Error('Database connection is not initialized'),
      };
    }

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

  static async init({
    connectionString,
  }: {
    connectionString: string;
  }): Promise<DatabaseClient> {
    const dbClient = new DatabaseClient();

    const pool = new Pool({
      connectionString,
      ssl: true,
    });
    dbClient.connection = drizzle({
      client: pool,
      logger: false,
      casing: 'snake_case',
    });
    const isConnectionStablishResult = await dbClient.isConnected();
    if (!isConnectionStablishResult.ok) {
      throw new Error('Database connection failed', {
        cause: isConnectionStablishResult.error,
      });
    }

    return dbClient;
  }
}
