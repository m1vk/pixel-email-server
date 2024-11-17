import { Controller, Get } from '@nestjs/common';
import { EmailGatewayService } from './email-gateway.service';

@Controller()
export class EmailGatewayController {
  constructor(private readonly emailGatewayService: EmailGatewayService) {}

  @Get()
  getHello(): string {
    return this.emailGatewayService.getHello();
  }
}
