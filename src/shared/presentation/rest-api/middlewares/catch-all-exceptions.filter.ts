import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { AppLoggerPort } from '../../../app-logger.port';
import { DomainError } from '../../../kernel/domain/errors/domain-error.interface';
import { ValidationError } from '../../../kernel/domain/errors/validation-error.interface';

type IProblemDetailsJsonBody = {
  type: string;
  title: string;
  status: number;
  detail?: string;
  errors?: unknown[];
};

const HTTP_STATUS_CODE_BY_ERROR_TYPE = {
  [DomainError.name]: 400,
  [ValidationError.name]: 422,
} as const;

/**
 * This filter catches all exceptions that are not handled by other filters
 * and transforms them into a standardized HTTP in a RFC-7807-compliant format.
 */
@Catch()
export class CatchAllExceptionsForHttp implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: AppLoggerPort,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      const errorData =
        typeof exceptionResponse === 'string'
          ? { message: exceptionResponse }
          : exceptionResponse;

      const responseBody: IProblemDetailsJsonBody = {
        type: 'about:blank',
        title: exception.name,
        status: exception.getStatus(),
        detail: exception.message,
        errors: [errorData],
      };
      httpAdapter.setHeader(
        response,
        'Content-Type',
        'application/problem+json',
      );
      httpAdapter.reply(response, responseBody, responseBody.status);

      return;
    }

    if (
      exception instanceof DomainError ||
      exception instanceof ValidationError
    ) {
      const maybeExceptionParentName =
        Object.getPrototypeOf(exception.constructor)?.name || undefined;
      const httpStatus =
        (maybeExceptionParentName
          ? HTTP_STATUS_CODE_BY_ERROR_TYPE[maybeExceptionParentName]
          : 500) ?? 500;

      const responseBody: IProblemDetailsJsonBody = {
        type: exception.errorCode,
        title: exception.name,
        status: httpStatus,
        detail: exception.message,
      };
      httpAdapter.setHeader(
        response,
        'Content-Type',
        'application/problem+json',
      );
      httpAdapter.reply(response, responseBody, responseBody.status);

      return;
    }

    const responseBody: IProblemDetailsJsonBody = {
      type: 'about:blank',
      title: 'Internal Server Error',
      status: 500,
      detail: undefined,
    };
    const httpStatus = responseBody.status;
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
