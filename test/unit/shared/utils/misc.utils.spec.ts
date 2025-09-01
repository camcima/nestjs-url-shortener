import { isNil } from '../../../../src/shared/utils/misc.utils.ts';

describe('isNil', () => {
  it('should return true for null or undefined', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false for non-null and non-undefined values', () => {
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(false)).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil([])).toBe(false);
  });
});
