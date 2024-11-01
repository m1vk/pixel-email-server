import { NestFactory } from '@nestjs/core';
import { AccountsModule } from './accounts.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AccountsModule, new FastifyAdapter());

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URL || 'nats://localhost:4222',
    },
  });

  console.log("Port: ", process.env.DATABASE_USER);

  await app.startAllMicroservices();
  await app.listen(4001);
  console.log(`User service is running on: ${await app.getUrl()}`);
}

bootstrap();