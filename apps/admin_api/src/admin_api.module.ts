import { Module } from '@nestjs/common';
import { AdminApiController } from './admin_api.controller';
import { AdminApiService } from './admin_api.service';

@Module({
  imports: [],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
