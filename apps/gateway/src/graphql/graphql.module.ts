import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { AuthModule } from '../modules/auth/auth.module';
import { GraphqlConfig } from './graphql.config';
import { AsyncLocalStorageModule } from '../../../../libs/common/src/als/async-local-storage-module';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      imports: [AuthModule, AsyncLocalStorageModule],
      useClass: GraphqlConfig,
    }),
  ],
})
export class GraphqlModule {}