import type { ShortUrl } from '../../../short-url/domain/entities/short-url.entity';
import type { ShortCode } from '../../../short-url/domain/value-objects/short-code.vo';

export abstract class ShortCodeRepositoryPort {
  abstract findByShortCode(shortCode: ShortCode): Promise<ShortUrl | null>;

  abstract save(shortCode: ShortUrl): Promise<void>;
}
