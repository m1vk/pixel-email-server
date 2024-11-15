import { Module } from '@nestjs/common';
import { AdminApiController } from './admin_api.controller';
import { AdminApiService } from './admin_api.service';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    GraphqlModule
  ],
  controllers: [AdminApiController],
  providers: [AdminApiService],
})
export class AdminApiModule {}
