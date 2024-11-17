import { Module } from '@nestjs/common';
import { EmailGatewayController } from './email-gateway.controller';
import { EmailGatewayService } from './email-gateway.service';

@Module({
  imports: [],
  controllers: [EmailGatewayController],
  providers: [EmailGatewayService],
})
export class EmailGatewayModule {}
