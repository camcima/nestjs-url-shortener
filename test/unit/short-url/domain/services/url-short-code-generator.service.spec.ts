import { UrlShortCodeGeneratorService } from '../../../../../src/short-url/domain/services/url-short-code-generator.service';
import { ShortCodeVO } from '../../../../../src/short-url/domain/value-objects/short-code.vo';

describe('UrlShortCodeGeneratorService', () => {
  describe('#generate()', () => {
    it('Should return a valid 6-length alphanumeric string as short code value object', () => {
      const urlShortCodeGeneratorService = new UrlShortCodeGeneratorService();

      const shortCodeVo = urlShortCodeGeneratorService.generate();

      expect(shortCodeVo).toBeInstanceOf(ShortCodeVO);
      expect(shortCodeVo.value).toHaveLength(6);
      expect(shortCodeVo.value).toMatch(/^[A-Za-z0-9\-_]{6}$/);
    });
  });
});
