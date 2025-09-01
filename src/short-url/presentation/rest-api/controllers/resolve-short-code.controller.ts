import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResolveShortCodeUrlUseCase } from '../../../application/use-cases/resolve-short-code-url.use-case.ts';
import { ResolveShortCodeDTO } from '../dtos/resolve-short-code.dto.ts';
import { ShortUrlReadDTO } from '../dtos/short-url.read-dto.ts';
import { ResolveUrlRestApiToApplicationMapper } from '../mappers/resolve-url-rest-api-to-application.mapper.ts';
import { ShortenUrlApplicationToRestApiMapper } from '../mappers/shorten-url-application-to-rest-api.mapper.ts';

@Controller()
@ApiUnauthorizedResponse()
export class ResolveShortCodeController {
  constructor(
    private readonly resolveShortCodeUrlUseCase: ResolveShortCodeUrlUseCase,
  ) {}

  @Get('resolve')
  @ApiBadRequestResponse()
  @ApiOkResponse({
    type: ShortUrlReadDTO,
  })
  async resolveShortCode(
    @Query() query: ResolveShortCodeDTO,
  ): Promise<ShortUrlReadDTO> {
    const result = await this.resolveShortCodeUrlUseCase.execute(
      ResolveUrlRestApiToApplicationMapper.fromResolveShortCodeDTO(query),
    );

    return ShortenUrlApplicationToRestApiMapper.toShortUrlReadDTO(result);
  }
}
