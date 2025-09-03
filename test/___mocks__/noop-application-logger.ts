import type { AppLoggerPort } from '../../src/shared/application-logger.service.port.ts';

export class NoopApplicationLoggerMock implements AppLoggerPort {
  setContext(): void {}
  error(): void {}
  warn(): void {}
  debug(): void {}
  verbose(): void {}
  info(): void {}
}
