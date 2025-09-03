import type { DatabaseClient } from '../../../shared/infrastructure/persistence/database-client';
import { ShortCodesTable } from './schemas/short-code.db';

export const databaseSchema = {
  ShortCodeDbTable: ShortCodesTable,
};

export type DatabaseClientPort = DatabaseClient<typeof databaseSchema>;
