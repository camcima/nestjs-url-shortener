import { IsString } from 'class-validator';

export class ResolveShortCodeCommandInput {
  @IsString()
  short_code: string;
}
