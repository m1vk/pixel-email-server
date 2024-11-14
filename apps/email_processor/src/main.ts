import { NestFactory } from '@nestjs/core';
import { EmailProcessorModule } from './email_processor.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailProcessorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
