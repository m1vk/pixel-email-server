import { Test, TestingModule } from '@nestjs/testing';
import { EmailProcessorController } from './email_processor.controller';
import { EmailProcessorService } from './email_processor.service';

describe('EmailProcessorController', () => {
  let emailProcessorController: EmailProcessorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailProcessorController],
      providers: [EmailProcessorService],
    }).compile();

    emailProcessorController = app.get<EmailProcessorController>(EmailProcessorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emailProcessorController.getHello()).toBe('Hello World!');
    });
  });
});
