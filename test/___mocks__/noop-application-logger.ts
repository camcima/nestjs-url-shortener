import type { AppLoggerPort } from '../../src/shared/app-logger.port';

export class NoopApplicationLoggerMock implements AppLoggerPort {
  setContext(): void {}
  error(): void {}
  warn(): void {}
  debug(): void {}
  verbose(): void {}
  info(): void {}
}
