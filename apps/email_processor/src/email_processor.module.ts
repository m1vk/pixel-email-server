import { Module } from '@nestjs/common';
import { EmailProcessorController } from './email_processor.controller';
import { EmailProcessorService } from './email_processor.service';

@Module({
  imports: [],
  controllers: [EmailProcessorController],
  providers: [EmailProcessorService],
})
export class EmailProcessorModule {}
