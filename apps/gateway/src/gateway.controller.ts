import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices'; 
import { Inject } from '@nestjs/common';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('ACCOUNTS_SERVICE') private readonly accountClient: ClientProxy,  
  ) {}

  @Get("hello")
  async getHello(): Promise<string | undefined> {
    return this.accountClient.send<string>({ cmd: 'getHello' }, {}).toPromise();  
  }
}
