import type { DatabaseClient } from '../../../shared/infrastructure/persistence/database-client.ts';
import { ShortCodesTable } from './schemas/short-code.db.ts';

export const databaseSchema = {
  ShortCodeDbTable: ShortCodesTable,
};

export type IDatabaseClient = DatabaseClient<typeof databaseSchema>;
