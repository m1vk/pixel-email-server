import { Controller, Get } from '@nestjs/common';
import { AdminApiService } from './admin_api.service';

@Controller()
export class AdminApiController {
  constructor(private readonly adminApiService: AdminApiService) {}

  @Get()
  getHello(): string {
    return this.adminApiService.getHello();
  }
}
