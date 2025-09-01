import { isNil } from '../../../shared/utils/misc.utils.ts';
import type { ShortUrl } from '../../domain/entities/short-url.entity.ts';
import { ShortCodeNotFoundError } from '../../domain/errors/short-code-not-found.error.ts';
import type { IShortCodeRepository } from '../../domain/repositories/short-code.repository.port.ts';
import type { ShortCodeVO } from '../../domain/value-objects/short-code.vo.ts';

export type IResolveShortCodeInputDTO = {
  /**
   * The short code to resolve the URL for.
   */
  shortCodeToResolve: ShortCodeVO;
};

export class ResolveShortCodeUrlUseCase {
  constructor(private readonly shortCodeRepository: IShortCodeRepository) {}

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
