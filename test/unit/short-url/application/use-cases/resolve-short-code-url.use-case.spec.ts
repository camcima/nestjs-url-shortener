import { DeepMockProxy, mock } from 'vitest-mock-extended';

import {
  type IResolveShortCodeInputDTO,
  ResolveShortCodeUrlUseCase,
} from '../../../../../src/short-url/application/use-cases/resolve-short-code-url.use-case';
import type { ShortUrl } from '../../../../../src/short-url/domain/entities/short-url.entity';
import { ShortCodeNotFoundError } from '../../../../../src/short-url/domain/errors/short-code-not-found.error';
import type { ShortCodeRepositoryPort } from '../../../../../src/short-url/domain/repositories/short-code.repository.port';
import { ShortCode } from '../../../../../src/short-url/domain/value-objects/short-code.vo';

describe('ResolveShortCodeUrlUseCase', () => {
  let shortenUrlUseCase: ResolveShortCodeUrlUseCase;
  // dependencies
  let shortCodeRepositoryMock: DeepMockProxy<ShortCodeRepositoryPort>;

  beforeEach(() => {
    shortCodeRepositoryMock = mock();

    shortenUrlUseCase = new ResolveShortCodeUrlUseCase(shortCodeRepositoryMock);
  });

  describe('#execute()', () => {
    describe('When the given short code exists', () => {
      it('should return the corresponding ShortUrl entity', async () => {
        const dummyExistingShortUrl: ShortUrl = {
          uuid: crypto.randomUUID(),
          destinationUrl: 'https://google.com',
          generatedAt: new Date(),
          shortCode: ShortCode.of('abcdef'),
        };
        shortCodeRepositoryMock.findByShortCode.mockResolvedValue(
          dummyExistingShortUrl,
        );

        const inputDto: IResolveShortCodeInputDTO = {
          shortCodeToResolve: dummyExistingShortUrl.shortCode,
        };

        const result = await shortenUrlUseCase.execute(inputDto);

        expect(result).toEqual(dummyExistingShortUrl);
      });
    });

    describe('When the given short code does not exist', () => {
      it('should throw the `ShortCodeNotFoundError` exception', async () => {
        shortCodeRepositoryMock.findByShortCode.mockResolvedValue(null);

        const inputDto: IResolveShortCodeInputDTO = {
          shortCodeToResolve: ShortCode.of('abcdef'),
        };

        await expect(() =>
          shortenUrlUseCase.execute(inputDto),
        ).rejects.toThrowError(ShortCodeNotFoundError);
      });
    });
  });
});
