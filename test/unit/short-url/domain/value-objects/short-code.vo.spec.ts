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
  });

  describe.todo('when the given short code is invalid', () => {});
});
