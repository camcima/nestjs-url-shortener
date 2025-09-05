import type { ShortUrl } from '../../../domain/entities/short-url.entity';
import { ShortUrlResponseDTO } from '../dtos/short-url.dto';

export class ShortenUrlApplicationToRestApiMapper {
  static toShortUrlReadDTO(entity: ShortUrl): ShortUrlResponseDTO {
    return {
      uuid: entity.uuid,
      destination_url: entity.destinationUrl,
      short_code: entity.shortCode.value,
    };
  }
}
