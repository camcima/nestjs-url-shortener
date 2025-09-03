import { InvalidShortCodeError } from '../../../../../src/short-url/domain/errors/invalid-short-code.error.ts';
import { ShortCodeVO } from '../../../../../src/short-url/domain/value-objects/short-code.vo.ts';

describe('ShortCodeVO', () => {
  describe('when the given short code is valid', () => {
    describe('.of()', () => {
      it('should create a valid short code', () => {
        const shortCode = ShortCodeVO.of('abcdef');

        expect(shortCode.value).toEqual('abcdef');
        expect(shortCode.toString()).toEqual('abcdef');
      });
    });

    describe('#equals()', () => {
      it('should return true when the same short code value is used', () => {
        const shortCodeA = ShortCodeVO.of('abcdef');
        const shortCodeB = ShortCodeVO.of('abcdef');

        expect(shortCodeA === shortCodeB).toBe(false);
        expect(shortCodeA.equals(shortCodeB)).toBe(true);
        expect(shortCodeB.equals(shortCodeA)).toBe(true);
      });
    });

    describe('#toString()', () => {
      it('should return the short code value as string', () => {
        const shortCode = ShortCodeVO.of('abcdef');

        expect(shortCode.toString()).toBe('abcdef');
      });
    });
  });

  describe('when the given short code is invalid', () => {
    describe('.of()', () => {
      it('should throw an error when the short code is an empty string', () => {
        expect(() => ShortCodeVO.of('')).toThrowError(InvalidShortCodeError);
      });

      it('should throw an error when the short code contains invalid characters', () => {
        expect(() => ShortCodeVO.of('abc$%')).toThrowError(
          InvalidShortCodeError,
        );
      });

      it('should throw an error when the short code is too short', () => {
        expect(() => ShortCodeVO.of('ab')).toThrowError(InvalidShortCodeError);
      });

      it('should throw an error when the short code is too long', () => {
        expect(() => ShortCodeVO.of('a'.repeat(31))).toThrowError(
          InvalidShortCodeError,
        );
      });
    });
  });
});
