import type { ShortUrl } from '../../../domain/entities/short-url.entity.ts';
import { ShortUrlReadDTO } from '../dtos/short-url.read-dto.ts';

export class ShortenUrlApplicationToRestApiMapper {
  static toShortUrlReadDTO(entity: ShortUrl): ShortUrlReadDTO {
    return {
      uuid: entity.uuid,
      destination_url: entity.destinationUrl,
      short_code: entity.shortCode.value,
    };
  }
}
