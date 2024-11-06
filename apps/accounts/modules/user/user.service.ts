import { PrismaInitTransaction_Decorator, PrismaTransaction } from '../../../../libs/common/src/prisma/transaction.decorator'
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../../src/utils/prisma/prisma.service';
import { UserFindOneByIdDTO } from './models/dto/user-find-by-id.dto';
import { UserFindOneDTO } from './models/dto/user-find-one.dto';
import { UserRegisterDTO } from './models/dto/user-register.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    private prisma: PrismaService,
    private userRepository: UserRepository,
    @Inject('MAIN') readonly clientProxy: ClientProxy,
  ) {}

  async findOneByPlayerId(payload: Partial<UserFindOneByIdDTO>) {
    if (!payload.playerId) {
      return null;
    }

    return this.prisma.user.findUnique({
      where: {
        userId: payload.playerId,
      },
      select: {
        userId: true,
        nikName: true,
        registerDate: true,
      },
    });
  }

  async findOne(payload: Partial<UserFindOneDTO>) {
    if (Object.keys(payload).length === 0) {
      return null;
    }
    return this.prisma.user.findUnique({
      where: {
        userId: payload.playerId,
        nikName: payload.nikName,
      },
      select: {
        userId: true,
        nikName: true,
        registerDate: true,
      },
    });
  }

  @PrismaInitTransaction_Decorator(PrismaService)
  async create(payload: UserRegisterDTO, @PrismaTransaction() prisma?: PrismaService) {
    const player = await this.userRepository.createUser(payload.nikName, prisma);
    const secretKey = payload.password;
    await this.userRepository.createUserAuthLocal(player.userId, secretKey, prisma);
    return payload;
  }
}
