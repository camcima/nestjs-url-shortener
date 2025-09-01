import { ValidationError } from '../../../shared/kernel/domain/errors/validation-error.interface.ts';

export class InvalidShortCodeError extends ValidationError {
  constructor(givenShortCode: string) {
    super({
      message: `The short code "${givenShortCode}" is malformed`,
    });
  }
}
