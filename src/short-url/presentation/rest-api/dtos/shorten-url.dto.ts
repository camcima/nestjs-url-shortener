import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ShortenUrlDTO {
  @IsUrl()
  @ApiProperty()
  destination_url: string;

  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description:
      'If not provided, a random valid short code will be generated.',
  })
  short_code: string;
}
