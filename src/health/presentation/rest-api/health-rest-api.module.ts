import { Module } from '@nestjs/common';

import { HealthModule } from '../../health.module';
import { AppHealthController } from './app-health.controller';

@Module({
  imports: [HealthModule],
  controllers: [AppHealthController],
})
export class HealthRestApiModule {}
