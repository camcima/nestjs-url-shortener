import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResolveShortCodeUrlUseCase } from '../../../application/use-cases/resolve-short-code-url.use-case';
import { ResolveShortCodeRequestDTO } from '../dtos/resolve-short-code.dto';
import { ShortUrlResponseDTO } from '../dtos/short-url.dto';
import { ResolveUrlRestApiToApplicationMapper } from '../mappers/resolve-url-rest-api-to-application.mapper';
import { ShortenUrlApplicationToRestApiMapper } from '../mappers/shorten-url-application-to-rest-api.mapper';

@Controller()
@ApiUnauthorizedResponse()
export class ResolveShortCodeController {
  constructor(
    private readonly resolveShortCodeUrlUseCase: ResolveShortCodeUrlUseCase,
  ) {}

  @Get('resolve')
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: ShortUrlResponseDTO,
  })
  async resolveShortCode(
    @Query() query: ResolveShortCodeRequestDTO,
  ): Promise<ShortUrlResponseDTO> {
    const result = await this.resolveShortCodeUrlUseCase.execute(
      ResolveUrlRestApiToApplicationMapper.fromResolveShortCodeDTO(query),
    );

    return ShortenUrlApplicationToRestApiMapper.toShortUrlReadDTO(result);
  }
}
