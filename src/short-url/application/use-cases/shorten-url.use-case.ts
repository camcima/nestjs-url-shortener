import crypto from 'node:crypto';

import { isNil } from '../../../shared/utils/misc.utils.ts';
import { ShortCodeVO } from '../../../short-url/domain/value-objects/short-code.vo.ts';
import { ShortUrl } from '../../domain/entities/short-url.entity.ts';
import { ShortCodeAlreadyTakenError } from '../../domain/errors/short-code-already-taken.error.ts';
import type { IShortCodeRepository } from '../../domain/repositories/short-code.repository.port.ts';
import type { UrlShortCodeGeneratorService } from '../../domain/services/url-short-code-generator.service.ts';

export interface IShortenUrlInputDTO {
  /**
   * The URL to shorten.
   */
  destinationUrl: string;
  /**
   * If not provided, a random valid short code will be generated.
   */
  shortCodeValueToUse?: string;
}

export class ShortenUrlUseCase {
  constructor(
    private readonly shortCodeRepository: IShortCodeRepository,
    private readonly urlShortCodeGeneratorService: UrlShortCodeGeneratorService,
  ) {}

  /**
   * @throws {ShortCodeAlreadyTakenError}
   */
  async execute(input: IShortenUrlInputDTO): Promise<ShortUrl> {
    let shortCodeToUse: ShortCodeVO;
    if (isNil(input.shortCodeValueToUse)) {
      shortCodeToUse = this.urlShortCodeGeneratorService.generate();
    } else {
      const givenShortCode = ShortCodeVO.of(input.shortCodeValueToUse);
      const maybeShortUrlSameShortCode =
        await this.shortCodeRepository.findByShortCode(givenShortCode);
      if (!!maybeShortUrlSameShortCode) {
        throw new ShortCodeAlreadyTakenError(givenShortCode);
      }

      shortCodeToUse = givenShortCode;
    }

    const generatedAt = new Date();
    const shortUrl = new ShortUrl({
      uuid: crypto.randomUUID(),
      shortCode: shortCodeToUse,
      destinationUrl: input.destinationUrl,
      generatedAt,
    });

    await this.shortCodeRepository.save(shortUrl);

    return shortUrl;
  }
}
