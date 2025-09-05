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
  let shortCodeRepositoryMock: ShortCodeRepositoryPort;

  beforeEach(() => {
    // TODO: find a better way to create mocks knowing that the deps might depend on other deps. because we are knowing too much about the deps structure when creating the mocks

    shortCodeRepositoryMock = {
      findByShortCode: vi.fn(),
    } as unknown as ShortCodeRepositoryPort;

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
        shortCodeRepositoryMock.findByShortCode = vi
          .fn()
          .mockResolvedValue(dummyExistingShortUrl);

        const inputDto: IResolveShortCodeInputDTO = {
          shortCodeToResolve: dummyExistingShortUrl.shortCode,
        };

        const result = await shortenUrlUseCase.execute(inputDto);

        expect(result).toEqual(dummyExistingShortUrl);
      });
    });

    describe('When the given short code does not exist', () => {
      it('should throw the `ShortCodeNotFoundError` exception', async () => {
        shortCodeRepositoryMock.findByShortCode = vi
          .fn()
          .mockResolvedValue(null);

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
