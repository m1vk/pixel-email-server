import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { MessagePattern } from '@nestjs/microservices';  


@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(): string {
    console.log(process.env.DATABASE_USER);
    return this.accountsService.getHello();
  }
}
