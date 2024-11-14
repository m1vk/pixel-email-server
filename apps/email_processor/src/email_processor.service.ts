import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailProcessorService {
  getHello(): string {
    return 'Hello World!';
  }
}
