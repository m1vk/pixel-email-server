import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EmailGatewayModule } from './email-gateway.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(EmailGatewayModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222']
    },
  });

  await app.listen();
}
bootstrap();
