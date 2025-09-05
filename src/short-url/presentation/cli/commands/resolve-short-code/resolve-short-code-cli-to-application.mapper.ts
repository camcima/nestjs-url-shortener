import { IResolveShortCodeInputDTO } from '../../../../application/use-cases/resolve-short-code-url.use-case';
import { ShortCode } from '../../../../domain/value-objects/short-code.vo';
import { ResolveShortCodeCommandInput } from './resolve-short-code-command-input';

export class ResolveShortCodeCliToApplicationMapper {
  static fromResolveShortCodeCommandInput(
    input: ResolveShortCodeCommandInput,
  ): IResolveShortCodeInputDTO {
    return {
      shortCodeToResolve: ShortCode.of(input.short_code),
    };
  }
}
