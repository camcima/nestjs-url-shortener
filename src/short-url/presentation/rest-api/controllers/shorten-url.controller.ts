import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ShortenUrlUseCase } from '../../../application/use-cases/shorten-url.use-case';
import { ShortUrlResponseDTO } from '../dtos/short-url.dto';
import { ShortenUrlRequestDTO } from '../dtos/shorten-url.dto';
import { ShortenUrlApplicationToRestApiMapper } from '../mappers/shorten-url-application-to-rest-api.mapper';
import { ShortenUrlRestApiToApplicationMapper } from '../mappers/shorten-url-rest-api-to-application.mapper';

@Controller('short-urls')
@ApiUnauthorizedResponse()
export class ShortenUrlController {
  constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) {}

  @Post()
  @ApiBadRequestResponse()
  @ApiCreatedResponse({
    type: ShortUrlResponseDTO,
  })
  @ApiUnprocessableEntityResponse()
  async shortenUrl(
    @Body() body: ShortenUrlRequestDTO,
  ): Promise<ShortUrlResponseDTO> {
    const shortenUrlUseCaseOutput = await this.shortenUrlUseCase.execute(
      ShortenUrlRestApiToApplicationMapper.fromShortenUrlDTO(body),
    );

    return ShortenUrlApplicationToRestApiMapper.toShortUrlReadDTO(
      shortenUrlUseCaseOutput,
    );
  }
}
