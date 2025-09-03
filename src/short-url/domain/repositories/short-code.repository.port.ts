import type { ShortUrl } from '../../../short-url/domain/entities/short-url.entity.ts';
import type { ShortCodeVO } from '../../../short-url/domain/value-objects/short-code.vo.ts';

export abstract class ShortCodeRepositoryPort {
  abstract findByShortCode(shortCode: ShortCodeVO): Promise<ShortUrl | null>;

  abstract save(shortCode: ShortUrl): Promise<void>;
}
