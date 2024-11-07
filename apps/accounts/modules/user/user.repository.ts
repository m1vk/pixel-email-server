import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/utils/prisma/prisma.service';
import { Prisma, PrismaClient, UsetAuthType } from '../../src/utils/prisma/types'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findPlayerByNikName(nikName: string) {
    const where: Prisma.UserWhereInput = { nikName };
    return await this.prisma.user.findFirst({ where });
  }

  async findUserAuthLocalByUserId(userId: string) {
    const where: Prisma.UsetAuthWhereInput = { userId };
    return await this.prisma.usetAuth.findFirst({ where });
  }

  async createUser(nikName: string, prisma = this.prisma) {
    const data: Prisma.UserUncheckedCreateInput = { nikName };
    return await prisma.user.create({ data });
  }

  async createUserAuthLocal(userId: string, secretKey: string, prisma = this.prisma) {
    const data: Prisma.UsetAuthUncheckedCreateInput = { userId, secretKey, publickey: secretKey, type: UsetAuthType.LOCAL };
    return await prisma.usetAuth.create({ data });
  }
}
