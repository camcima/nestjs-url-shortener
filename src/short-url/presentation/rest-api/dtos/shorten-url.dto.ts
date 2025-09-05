import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class ShortenUrlRequestDTO {
  @IsUrl()
  @ApiProperty()
  destination_url: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    type: String,
    description:
      'If not provided, a random valid short code will be generated.',
  })
  short_code?: string;
}
