import type { IAppLogger } from '../../src/shared/application-logger.service.port.ts';

export class NoopApplicationLoggerMock implements IAppLogger {
  setContext(): void {}
  error(): void {}
  warn(): void {}
  debug(): void {}
  verbose(): void {}
  info(): void {}
}
