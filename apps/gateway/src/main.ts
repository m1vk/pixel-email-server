import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    GatewayModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URL || 'nats://localhost:4222',
    },
  });

  await app.startAllMicroservices();

  app.enableCors({ credentials: true, origin: true });

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
  console.log(`Gateway is running on: ${await app.getUrl()}`);
}

bootstrap();
