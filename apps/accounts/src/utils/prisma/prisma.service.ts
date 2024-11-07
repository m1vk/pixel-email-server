import startTransaction from '../../../../../libs/common/src/prisma/prisma.transaction-wrap';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from './types';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('PrismaService');

  constructor() {
    const logParams: Prisma.LogDefinition[] = [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ];
    super({ log: logParams });
    const on = this.$on.bind(this) as any;
    on('query', (e: Prisma.QueryEvent) => {
      this.logger.log('Query: %s \nParams: %s\nTarget: %s\nDuration: %s ms', e.query, e.params, e.target, e.duration);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  startTransaction(maxWait = 15000, timeout = 10000) {
    return startTransaction(this, maxWait, timeout);
  }
}
