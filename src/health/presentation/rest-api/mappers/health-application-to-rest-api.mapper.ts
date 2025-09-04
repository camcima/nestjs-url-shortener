import { HealthCheckResult } from '@nestjs/terminus';

import { HealthCheckResultDTO } from '../dto/health-check-result.dto';

export class HealthApplicationToRestApiMapper {
  static toHealthCheckResultDTO(
    healthCheckResult: HealthCheckResult,
  ): HealthCheckResultDTO {
    const dto = new HealthCheckResultDTO();
    dto.status = healthCheckResult.status;
    dto.info = healthCheckResult.info;
    dto.error = healthCheckResult.error;
    dto.details = healthCheckResult.details;
    return dto;
  }
}
