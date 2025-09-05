import { Injectable } from '@nestjs/common';

import { isNil } from '../../../shared/utils/misc.utils';
import type { ShortUrl } from '../../domain/entities/short-url.entity';
import { ShortCodeNotFoundError } from '../../domain/errors/short-code-not-found.error';
import { ShortCodeRepositoryPort } from '../../domain/repositories/short-code.repository.port';
import type { ShortCode } from '../../domain/value-objects/short-code.vo';

export type IResolveShortCodeInputDTO = {
  /**
   * The short code to resolve the URL for.
   */
  shortCodeToResolve: ShortCode;
};

@Injectable()
export class ResolveShortCodeUrlUseCase {
  constructor(private readonly shortCodeRepository: ShortCodeRepositoryPort) {}

  /**
   * @throws {ShortCodeNotFoundError}
   */
  async execute(input: IResolveShortCodeInputDTO): Promise<ShortUrl> {
    const maybeShortUrlSameShortCode =
      await this.shortCodeRepository.findByShortCode(input.shortCodeToResolve);
    if (isNil(maybeShortUrlSameShortCode)) {
      throw new ShortCodeNotFoundError(input.shortCodeToResolve);
    } else {
      return maybeShortUrlSameShortCode;
    }
  }
}
