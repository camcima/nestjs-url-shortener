import { ValidationError } from '../../../shared/kernel/domain/errors/validation-error.interface';

export class InvalidShortCodeError extends ValidationError {
  constructor(givenShortCode: string) {
    super({
      message: `The short code "${givenShortCode}" is malformed`,
    });
  }
}
