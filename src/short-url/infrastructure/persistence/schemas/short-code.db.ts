import { sql } from 'drizzle-orm';
import { bigserial, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const ShortCodesTable = pgTable('short_codes', {
  id: bigserial('id', {
    mode: 'bigint',
  }).primaryKey(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),

  uuid: varchar('uuid').primaryKey().notNull(),
  short_code: varchar('short_code', { length: 10 }).notNull().unique(),
  destination_url: varchar('destination_url', { length: 2048 }).notNull(),
});
