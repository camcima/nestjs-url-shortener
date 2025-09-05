import { validateOrReject } from 'class-validator';
import { Command, CommandRunner } from 'nest-commander';

import { AppLoggerPort } from '../../../../../shared/app-logger.port';
import { ResolveShortCodeUrlUseCase } from '../../../../application/use-cases/resolve-short-code-url.use-case';
import { ResolveShortCodeCliToApplicationMapper } from './resolve-short-code-cli-to-application.mapper';
import { ResolveShortCodeCommandInput } from './resolve-short-code-command-input';

@Command({
  name: 'resolve-short-code',
  arguments: '<short_code>',
  description: 'TODO',
  options: {
    hidden: false,
    isDefault: false,
  },
})
export class ResolveShortCodeCommand extends CommandRunner {
  constructor(
    private readonly appLogger: AppLoggerPort,

    private readonly resolveShortCodeUrlUseCase: ResolveShortCodeUrlUseCase,
  ) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    try {
      const maybeShortCode = passedParam[0];
      const input = new ResolveShortCodeCommandInput();
      input.short_code = maybeShortCode;

      await validateOrReject(input);

      const result = await this.resolveShortCodeUrlUseCase.execute(
        ResolveShortCodeCliToApplicationMapper.fromResolveShortCodeCommandInput(
          input,
        ),
      );
      this.appLogger.info(result);
    } catch (error) {
      if (error instanceof Error) {
        this.appLogger.error(error.message);
      } else {
        this.appLogger.error(error);
      }
    }
  }
}
