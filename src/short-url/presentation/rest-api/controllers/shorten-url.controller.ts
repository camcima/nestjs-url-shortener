import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ShortenUrlUseCase } from '../../../application/use-cases/shorten-url.use-case.ts';
import { ShortUrlReadDTO } from '../dtos/short-url.read-dto.ts';
import { ShortenUrlDTO } from '../dtos/shorten-url.dto.ts';
import { ShortenUrlApplicationToRestApiMapper } from '../mappers/shorten-url-application-to-rest-api.mapper.ts';
import { ShortenUrlRestApiToApplicationMapper } from '../mappers/shorten-url-rest-api-to-application.mapper.ts';

@Controller('short-urls')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class ShortenUrlController {
  constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({
    type: ShortUrlReadDTO,
  })
  async shortenUrl(@Body() body: ShortenUrlDTO): Promise<ShortUrlReadDTO> {
    const shortenUrlUseCaseOutput = await this.shortenUrlUseCase.execute(
      ShortenUrlRestApiToApplicationMapper.fromShortenUrlDTO(body),
    );

    return ShortenUrlApplicationToRestApiMapper.toShortUrlReadDTO(
      shortenUrlUseCaseOutput,
    );
  }
}
