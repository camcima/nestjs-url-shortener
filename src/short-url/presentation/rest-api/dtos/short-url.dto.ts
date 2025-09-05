import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlResponseDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  destination_url: string;

  @ApiProperty()
  short_code: string;
}
