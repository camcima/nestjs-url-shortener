import { DomainError } from '../../../shared/kernel/domain/errors/domain-error.interface.ts';
import type { ShortCodeVO } from '../value-objects/short-code.vo.ts';

export class ShortCodeNotFoundError extends DomainError {
  constructor(public readonly shortCode: ShortCodeVO) {
    super({
      message: `Short code not found: "${shortCode}"`,
    });
  }
}
