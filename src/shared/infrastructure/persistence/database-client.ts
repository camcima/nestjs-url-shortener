import { sql } from 'drizzle-orm';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { lastValueFrom } from 'rxjs';

import { retryAsyncFunction } from '../../utils/misc.utils';

export class DatabaseClient<DbSchema extends Record<string, unknown> = any> {
  connection: NodePgDatabase<DbSchema>;
  private pool: Pool;

  private constructor() {}

  async isConnected(params: {
    retryAttempts: number;
    retryDelayMs: number;
  }): Promise<
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

    const pingConnection = async () => {
      await this.connection.execute(sql`SELECT 1`);
    };

    try {
      await lastValueFrom(
        retryAsyncFunction({
          callback: pingConnection,
          maxRetries: params.retryAttempts,
          retryIntervalMs: params.retryDelayMs,
        }),
      );

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
    connectionParams,
  }: {
    connectionParams: {
      host: string;
      user: string;
      password?: string;
      port: number;
      database: string;
    };
  }): Promise<DatabaseClient> {
    const dbClient = new DatabaseClient();

    dbClient.pool = new Pool({
      host: connectionParams.host,
      user: connectionParams.user,
      password: connectionParams.password,
      port: connectionParams.port,
      database: connectionParams.database,
      ssl: true,
    });
    dbClient.connection = drizzle({
      client: dbClient.pool,
      logger: false,
      casing: 'snake_case',
    });
    const isConnectionStablishResult = await dbClient.isConnected({
      retryAttempts: 10,
      retryDelayMs: 2_000,
    });
    if (!isConnectionStablishResult.ok) {
      throw new Error('Database connection failed', {
        cause: isConnectionStablishResult.error,
      });
    }

    return dbClient;
  }

  async closeConnection(): Promise<void> {
    await this.pool.end();
  }
}
