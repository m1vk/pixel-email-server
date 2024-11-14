import { Controller, Get } from '@nestjs/common';
import { EmailProcessorService } from './email_processor.service';

@Controller()
export class EmailProcessorController {
  constructor(private readonly emailProcessorService: EmailProcessorService) {}

  @Get()
  getHello(): string {
    return this.emailProcessorService.getHello();
  }
}
