import { DomainError } from '../../../shared/kernel/domain/errors/domain-error.interface';
import type { ShortCode } from '../value-objects/short-code.vo';

export class ShortCodeNotFoundError extends DomainError {
  constructor(public readonly shortCode: ShortCode) {
    super({
      message: `Short code not found: "${shortCode}"`,
    });
  }
}
