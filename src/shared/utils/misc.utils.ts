import { defer, timer } from 'rxjs';
import { retry } from 'rxjs/operators';

/**
 * Perform a sequential retry of a given `callback` function until it resolves
 * or the maximum number of retries is reached.
 */
export function retryAsyncFunction({
  callback,
  maxRetries,
  retryIntervalMs,
}: {
  callback: () => Promise<any>;
  maxRetries: number;
  retryIntervalMs: number;
}) {
  return defer(() => {
    return callback();
  }).pipe(
    retry({
      count: maxRetries,
      delay: () => {
        return timer(retryIntervalMs);
      },
    }),
  );
}

export function isNil(value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null;
}
