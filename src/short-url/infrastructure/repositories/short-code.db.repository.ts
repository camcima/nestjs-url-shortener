import { eq } from 'drizzle-orm';

import { ShortUrl } from '../../domain/entities/short-url.entity';
import type { ShortCodeRepositoryPort } from '../../domain/repositories/short-code.repository.port';
import { ShortCode } from '../../domain/value-objects/short-code.vo';
import { IDatabaseClient, shortUrlDbSchema } from '../persistence';

export class ShortCodeRepository implements ShortCodeRepositoryPort {
  constructor(private readonly dbClient: IDatabaseClient) {}

  async findByShortCode(shortCode: ShortCode): Promise<ShortUrl | null> {
    const db = this.dbClient.connection;

    const results = await db
      .select()
      .from(shortUrlDbSchema.ShortCodesTable)
      .where(eq(shortUrlDbSchema.ShortCodesTable.short_code, shortCode.value))
      .limit(1);

    // const resultsRaw = await db.execute(
    //   sql`select * from ${databaseSchema.ShortCodeDbTable} where ${databaseSchema.ShortCodeDbTable.short_code} = ${shortCode.value} LIMIT 1`,
    // );

    const maybeRow = results[0];
    if (maybeRow) {
      return new ShortUrl({
        uuid: maybeRow.uuid,
        shortCode: ShortCode.of(maybeRow.short_code),
        destinationUrl: maybeRow.destination_url,
        generatedAt: maybeRow.created_at,
      });
    } else {
      return null;
    }
  }

  async save(shortCode: ShortUrl): Promise<void> {
    const db = this.dbClient.connection;

    await db
      .insert(shortUrlDbSchema.ShortCodesTable)
      .values({
        uuid: shortCode.uuid,
        short_code: shortCode.shortCode.value,
        destination_url: shortCode.destinationUrl,
        created_at: shortCode.generatedAt,
      })
      .execute();
  }
}
