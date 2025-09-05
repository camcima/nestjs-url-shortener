import { IResolveShortCodeInputDTO } from '../../../../application/use-cases/resolve-short-code-url.use-case';
import { ShortCodeVO } from '../../../../domain/value-objects/short-code.vo';
import { ResolveShortCodeCommandInput } from './resolve-short-code-command-input';

export class ResolveShortCodeCliToApplicationMapper {
  static fromResolveShortCodeCommandInput(
    input: ResolveShortCodeCommandInput,
  ): IResolveShortCodeInputDTO {
    return {
      shortCodeToResolve: ShortCodeVO.of(input.short_code),
    };
  }
}
