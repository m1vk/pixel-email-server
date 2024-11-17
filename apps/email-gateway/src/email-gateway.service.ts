import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
