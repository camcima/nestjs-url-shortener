import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { HealthCheckService } from '@nestjs/terminus';

import { DatabaseHealthIndicatorService } from '../../domain/services/database-health-indicator.service';
import { HealthCheckResultDTO } from './dto/health-check-result.dto';
import { HealthApplicationToRestApiMapper } from './mappers/health-application-to-rest-api.mapper';

@Controller('health')
export class AppHealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,

    private readonly databaseHealthIndicatorService: DatabaseHealthIndicatorService,
  ) {}

  @Get()
  @ApiOkResponse({ type: HealthCheckResultDTO })
  async checkBackingServices(): Promise<HealthCheckResultDTO> {
    const healthCheckResult = await this.healthCheckService.check([
      () => this.databaseHealthIndicatorService.isHealthy(),
    ]);

    return HealthApplicationToRestApiMapper.toHealthCheckResultDTO(
      healthCheckResult,
    );
  }
}
