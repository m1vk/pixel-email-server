import { PrismaInitTransaction_Decorator, PrismaTransaction } from '../../../../libs/common/src/prisma/transaction.decorator'
import { Inject, Injectable, Logger } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../src/utils/prisma/prisma.service';
import { UserRegisterDTO } from './models/dto/user-register.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserAuthService {
  private logger = new Logger(UserAuthService.name);
  constructor(
    private userRepository: UserRepository,
  ) {}

  @PrismaInitTransaction_Decorator(PrismaService)
  async registerPlayerLocal(payload: UserRegisterDTO, @PrismaTransaction() prisma?: PrismaService) {
    const player = await this.userRepository.createUser(payload.nikName, prisma);
    const secretKey = await this.createSecret(payload.password);
    await this.userRepository.createUserAuthLocal(player.userId, secretKey, prisma);
    // notify sucessfully register
    return payload;
  }

  async loginLocalPlayer(nikName: string, password: string) {
    const player = await this.userRepository.findPlayerByNikName(nikName);
    if (!player) {
      this.logger.log('loginPlayer: player nikName: %s, not found', nikName);
      return null;
    }
    const userAuth = await this.userRepository.findUserAuthLocalByUserId(player.userId);
    if (!userAuth) {
      this.logger.log('loginPlayer: UserAuth for userId: %s, not found', player.userId);
      return null;
    }
    const isPasswordValid = await this.checkSecret(password, userAuth.secretKey);
    if (!isPasswordValid) {
      this.logger.log('loginPlayer: check password for userId: %s, invalid', player.userId);
      return null;
    }
    return player;
  }

  private async checkSecret(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  private async createSecret(password: string) {
    return await hash(password, 12);
  }
}
