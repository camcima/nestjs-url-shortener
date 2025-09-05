import crypto from 'node:crypto';

import { AppLoggerPort } from '../../../shared/app-logger.port';
import { isNil } from '../../../shared/utils/misc.utils';
import { ShortCode } from '../../../short-url/domain/value-objects/short-code.vo';
import { ShortUrl } from '../../domain/entities/short-url.entity';
import { ShortCodeAlreadyTakenError } from '../../domain/errors/short-code-already-taken.error';
import { ShortCodeRepositoryPort } from '../../domain/repositories/short-code.repository.port';
import { UrlShortCodeGeneratorService } from '../../domain/services/url-short-code-generator.service';

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
    private readonly logger: AppLoggerPort,

    private readonly shortCodeRepository: ShortCodeRepositoryPort,
    private readonly urlShortCodeGeneratorService: UrlShortCodeGeneratorService,
  ) {}

  /**
   * @throws {ShortCodeAlreadyTakenError}
   */
  async execute(input: IShortenUrlInputDTO): Promise<ShortUrl> {
    let shortCodeToUse: ShortCode;
    if (isNil(input.shortCodeValueToUse)) {
      shortCodeToUse = this.urlShortCodeGeneratorService.generate();
    } else {
      const givenShortCode = ShortCode.of(input.shortCodeValueToUse);
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

    this.logger.info(
      `Generated short URL with code "${shortUrl.shortCode}" for destination URL "${shortUrl.destinationUrl}"`,
    );
    await this.shortCodeRepository.save(shortUrl);

    return shortUrl;
  }
}
