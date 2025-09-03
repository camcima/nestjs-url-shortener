import { Module, Scope } from '@nestjs/common';
import {
  LoggerModule as NestjsPinoLoggerModule,
  PinoLogger,
} from 'nestjs-pino';

import { IAppLogger } from '../../application-logger.service.port.ts';
import { environmentConfiguration } from '../environment.configuration.ts';

@Module({
  imports: [
    NestjsPinoLoggerModule.forRootAsync({
      useFactory: () => {
        return {
          // attaching logs to request and response object
          pinoHttp: {
            level: environmentConfiguration.LOG_LEVEL,
            formatters: {
              bindings: (bindings) => ({
                pid: bindings.pid,
              }),
              level: (label: string) => {
                return {
                  level: label,
                };
              },
            },
            transport:
              environmentConfiguration.NODE_ENV === 'production'
                ? {
                    target: 'pino-pretty',
                    options: {
                      colorize: true,
                      translateTime: 'SYS:standard',
                      ignore: 'pid,hostname',
                    },
                  }
                : undefined,
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: IAppLogger,
      scope: Scope.TRANSIENT,
      useClass: PinoLogger,
    },
  ],
  exports: [IAppLogger],
})
export class LoggerModule {}
