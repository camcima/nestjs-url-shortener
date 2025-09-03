import type { AppLoggerPort } from '../../src/shared/application-logger.service.port';

export class NoopApplicationLoggerMock implements AppLoggerPort {
  setContext(): void {}
  error(): void {}
  warn(): void {}
  debug(): void {}
  verbose(): void {}
  info(): void {}
}
