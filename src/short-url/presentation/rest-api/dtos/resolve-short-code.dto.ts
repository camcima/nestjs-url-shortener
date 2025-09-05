import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResolveShortCodeRequestDTO {
  @IsString()
  @ApiProperty()
  short_code: string;
}
