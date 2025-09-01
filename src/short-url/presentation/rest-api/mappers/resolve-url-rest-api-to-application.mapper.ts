import type { IResolveShortCodeInputDTO } from '../../../application/use-cases/resolve-short-code-url.use-case.ts';
import { ShortCodeVO } from '../../../domain/value-objects/short-code.vo.ts';
import type { ResolveShortCodeDTO } from '../dtos/resolve-short-code.dto.ts';

export class ResolveUrlRestApiToApplicationMapper {
  static fromResolveShortCodeDTO(
    dto: ResolveShortCodeDTO,
  ): IResolveShortCodeInputDTO {
    return {
      shortCodeToResolve: ShortCodeVO.of(dto.short_code),
    };
  }
}
