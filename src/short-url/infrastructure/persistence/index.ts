import { DatabaseClient } from '../../../shared/infrastructure/persistence/database-client';
import { ShortCodesTable } from './schemas/short-code.db';

export const shortUrlDbSchema = {
  ShortCodesTable,
};

export type IDatabaseClient = DatabaseClient<typeof shortUrlDbSchema>;
