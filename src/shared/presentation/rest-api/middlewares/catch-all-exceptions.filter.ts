import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { DomainError } from '../../../kernel/domain/errors/domain-error.interface';
import { ValidationError } from '../../../kernel/domain/errors/validation-error.interface';

@Catch()
export class CatchAllExceptions extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // domain erros will be mapped intto 422 Unprocessable Entity
    if (exception instanceof DomainError) {
      throw new UnprocessableEntityException({
        message: exception.message,
        error: exception.errorCode,
      });
    }

    // validation errors will be mapped into 400 Bad Request
    if (exception instanceof ValidationError) {
      throw new BadRequestException({
        message: exception.message,
        error: exception.name,
      });
    }

    super.catch(exception, host);
  }
}
