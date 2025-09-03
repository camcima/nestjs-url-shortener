import type { IResolveShortCodeInputDTO } from '../../../application/use-cases/resolve-short-code-url.use-case';
import { ShortCodeVO } from '../../../domain/value-objects/short-code.vo';
import type { ResolveShortCodeDTO } from '../dtos/resolve-short-code.dto';

export class ResolveUrlRestApiToApplicationMapper {
  static fromResolveShortCodeDTO(
    dto: ResolveShortCodeDTO,
  ): IResolveShortCodeInputDTO {
    return {
      shortCodeToResolve: ShortCodeVO.of(dto.short_code),
    };
  }
}
