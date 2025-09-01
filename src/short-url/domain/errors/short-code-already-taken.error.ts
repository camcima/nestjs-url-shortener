import { DomainError } from '../../../shared/kernel/domain/errors/domain-error.interface.ts';
import type { ShortCodeVO } from '../../../short-url/domain/value-objects/short-code.vo.ts';

export class ShortCodeAlreadyTakenError extends DomainError {
  constructor(public readonly shortCode: ShortCodeVO) {
    super({
      message: 'Short code already taken',
    });
  }
}
