import type { IShortenUrlInputDTO } from '../../../application/use-cases/shorten-url.use-case.ts';
import type { ShortenUrlDTO } from '../dtos/shorten-url.dto.ts';

export class ShortenUrlRestApiToApplicationMapper {
  static fromShortenUrlDTO(dto: ShortenUrlDTO): IShortenUrlInputDTO {
    return {
      destinationUrl: dto.destination_url,
      shortCodeValueToUse: dto.short_code || undefined,
    };
  }
}
