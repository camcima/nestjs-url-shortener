import { lastValueFrom } from 'rxjs';

import {
  isNil,
  retryAsyncFunction,
} from '../../../../src/shared/utils/misc.utils';

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

describe('retryAsyncFunction', () => {
  describe('When the retried function succeeds before reaching the maximum retry attempt', () => {
    it('should perform a retry of a given function until it succeeds', async () => {
      let callCount = 0;

      const whenRetryResult = lastValueFrom(
        retryAsyncFunction({
          callback: () => {
            callCount++;

            if (callCount < 3) {
              throw new Error('Failed attempt');
            } else {
              return Promise.resolve(true);
            }
          },
          maxRetries: 3,
          retryIntervalMs: 1,
        }),
      );

      await expect(whenRetryResult).resolves.toEqual(true);
      expect(callCount).toBe(3);
    });
  });

  describe('When the retried fails before the maximum amount of retry', () => {
    it('should propagate the exception araised by the supplied callback function', async () => {
      let callCount = 0;

      const errorToThrow = new Error('Some specific error');
      const whenRetryResult = lastValueFrom(
        retryAsyncFunction({
          callback: () => {
            callCount++;

            throw errorToThrow;
          },
          maxRetries: 4,
          retryIntervalMs: 1,
        }),
      );

      await expect(whenRetryResult).rejects.toThrow(errorToThrow);
      expect(callCount).toBe(5);
    });
  });
});
