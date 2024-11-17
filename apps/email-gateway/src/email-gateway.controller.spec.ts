import { Test, TestingModule } from '@nestjs/testing';
import { EmailGatewayController } from './email-gateway.controller';
import { EmailGatewayService } from './email-gateway.service';

describe('EmailGatewayController', () => {
  let emailGatewayController: EmailGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailGatewayController],
      providers: [EmailGatewayService],
    }).compile();

    emailGatewayController = app.get<EmailGatewayController>(EmailGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emailGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
