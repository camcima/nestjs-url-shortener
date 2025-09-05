import type { IResolveShortCodeInputDTO } from '../../../application/use-cases/resolve-short-code-url.use-case';
import { ShortCode } from '../../../domain/value-objects/short-code.vo';
import type { ResolveShortCodeRequestDTO } from '../dtos/resolve-short-code.dto';

export class ResolveUrlRestApiToApplicationMapper {
  static fromResolveShortCodeDTO(
    dto: ResolveShortCodeRequestDTO,
  ): IResolveShortCodeInputDTO {
    return {
      shortCodeToResolve: ShortCode.of(dto.short_code),
    };
  }
}
