import { ApiProperty } from '@nestjs/swagger';
import { HealthIndicatorResult } from '@nestjs/terminus';

enum HEALTH_CHECK_STATUS_ENUM {
  error = 'error',
  ok = 'ok',
  shutting_down = 'shutting_down',
}

export class HealthCheckResultDTO {
  @ApiProperty({
    enum: HEALTH_CHECK_STATUS_ENUM,
  })
  status: `${HEALTH_CHECK_STATUS_ENUM}`;

  info?: HealthIndicatorResult;
  error?: HealthIndicatorResult;
  details: HealthIndicatorResult;
}
