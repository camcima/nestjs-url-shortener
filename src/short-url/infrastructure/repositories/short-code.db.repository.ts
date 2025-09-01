import { eq } from 'drizzle-orm';

import { ShortUrl } from '../../domain/entities/short-url.entity.ts';
import type { IShortCodeRepository } from '../../domain/repositories/short-code.repository.port.ts';
import { ShortCodeVO } from '../../domain/value-objects/short-code.vo.ts';
import {
  type IDatabaseClient,
  databaseSchema,
} from '../persistence/database-client.port.ts';

export class ShortCodeDbRepository implements IShortCodeRepository {
  constructor(private readonly dbClient: IDatabaseClient) {}

  async findByShortCode(shortCode: ShortCodeVO): Promise<ShortUrl | null> {
    const db = this.dbClient.connection;

    const results = await db
      .select()
      .from(databaseSchema.ShortCodeDbTable)
      .where(eq(databaseSchema.ShortCodeDbTable.short_code, shortCode.value))
      .limit(1);

    // const resultsRaw = await db.execute(
    //   sql`select * from ${databaseSchema.ShortCodeDbTable} where ${databaseSchema.ShortCodeDbTable.short_code} = ${shortCode.value} LIMIT 1`,
    // );

    const maybeRow = results[0];
    if (maybeRow) {
      return new ShortUrl({
        uuid: maybeRow.uuid,
        shortCode: ShortCodeVO.of(maybeRow.short_code),
        destinationUrl: maybeRow.destination_url,
        generatedAt: maybeRow.created_at,
      });
    } else {
      return null;
    }
  }

  async save(shortCode: ShortUrl): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
