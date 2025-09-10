import { DeepMockProxy, mock } from 'vitest-mock-extended';

import type { AppLoggerPort } from '../../../../../src/shared/app-logger.port';
import {
  type IShortenUrlInputDTO,
  ShortenUrlUseCase,
} from '../../../../../src/short-url/application/use-cases/shorten-url.use-case';
import { ShortUrl } from '../../../../../src/short-url/domain/entities/short-url.entity';
import { ShortCodeAlreadyTakenError } from '../../../../../src/short-url/domain/errors/short-code-already-taken.error';
import type { ShortCodeRepositoryPort } from '../../../../../src/short-url/domain/repositories/short-code.repository.port';
import type { UrlShortCodeGeneratorService } from '../../../../../src/short-url/domain/services/url-short-code-generator.service';
import { ShortCode } from '../../../../../src/short-url/domain/value-objects/short-code.vo';
import { NoopApplicationLoggerMock } from '../../../../__mocks__/noop-application-logger';

describe('ShortenUrlUseCase', () => {
  let shortenUrlUseCase: ShortenUrlUseCase;
  // dependencies
  let loggerMock: AppLoggerPort;
  let urlShortCodeGeneratorServiceMock: DeepMockProxy<UrlShortCodeGeneratorService>;
  let shortCodeRepositoryMock: DeepMockProxy<ShortCodeRepositoryPort>;

  beforeEach(() => {
    loggerMock = new NoopApplicationLoggerMock();
    urlShortCodeGeneratorServiceMock = mock();
    shortCodeRepositoryMock = mock();

    shortenUrlUseCase = new ShortenUrlUseCase(
      loggerMock,
      shortCodeRepositoryMock,
      urlShortCodeGeneratorServiceMock,
    );
  });

  describe('#execute()', () => {
    describe('When the short is supplied', () => {
      describe('And the short code is already taken', () => {
        it('should throw the `ShortCodeAlreadyTakenError` exception', async () => {
          shortCodeRepositoryMock.save.mockResolvedValue(undefined);
          urlShortCodeGeneratorServiceMock.generate.mockReturnValue(
            ShortCode.of('abcdef'),
          );
          const dummyExistingShortUrl = new ShortUrl({
            uuid: crypto.randomUUID(),
            destinationUrl: 'https://google.com',
            generatedAt: new Date(),
            shortCode: ShortCode.of('abcdef'),
          });
          shortCodeRepositoryMock.findByShortCode.mockResolvedValue(
            dummyExistingShortUrl,
          );

          const inputDto: IShortenUrlInputDTO = {
            destinationUrl: 'https://google.com.br',
            shortCodeValueToUse: 'abcdef',
          };

          const whenResult = shortenUrlUseCase.execute(inputDto);

          await expect(whenResult).rejects.toThrowError(
            ShortCodeAlreadyTakenError,
          );
        });
      });

      describe('And the short code is not taken', () => {
        it('should shorten a URL with a given short code', async () => {
          shortCodeRepositoryMock.save.mockResolvedValue(undefined);
          urlShortCodeGeneratorServiceMock.generate.mockReturnValue(
            ShortCode.of('abcdef'),
          );
          shortCodeRepositoryMock.findByShortCode.mockResolvedValue(null);

          const inputDto: IShortenUrlInputDTO = {
            destinationUrl: 'https://google.com.br',
            shortCodeValueToUse: 'abcdef',
          };

          const result = await shortenUrlUseCase.execute(inputDto);

          expect(result).toBeInstanceOf(ShortUrl);
          expect(result.destinationUrl).toBe(inputDto.destinationUrl);
          expect(result.shortCode.value).toBe(inputDto.shortCodeValueToUse);
          expect(result.generatedAt).toBeInstanceOf(Date);
        });
      });
    });

    describe('When the short code is not supplied', () => {
      it('should shorten a URL with a random generated short code', async () => {
        shortCodeRepositoryMock.save.mockResolvedValue(undefined);
        urlShortCodeGeneratorServiceMock.generate.mockReturnValue(
          ShortCode.of('hjikfl'),
        );
        shortCodeRepositoryMock.findByShortCode.mockResolvedValue(null);

        const inputDto: IShortenUrlInputDTO = {
          destinationUrl: 'https://google.com.br',
        };

        const result = await shortenUrlUseCase.execute(inputDto);

        expect(result).toBeInstanceOf(ShortUrl);
        expect(result.destinationUrl).toBe(inputDto.destinationUrl);
        expect(result.shortCode.value).toBe('hjikfl');
        expect(result.generatedAt).toBeInstanceOf(Date);
      });
    });
  });
});
