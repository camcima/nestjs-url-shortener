import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlReadDTO {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  destination_url: string;

  @ApiProperty()
  short_code: string;
}
