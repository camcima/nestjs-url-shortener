import type { IShortenUrlInputDTO } from '../../../application/use-cases/shorten-url.use-case';
import type { ShortenUrlRequestDTO } from '../dtos/shorten-url.dto';

export class ShortenUrlRestApiToApplicationMapper {
  static fromShortenUrlDTO(dto: ShortenUrlRequestDTO): IShortenUrlInputDTO {
    return {
      destinationUrl: dto.destination_url,
      shortCodeValueToUse: dto.short_code || undefined,
    };
  }
}
