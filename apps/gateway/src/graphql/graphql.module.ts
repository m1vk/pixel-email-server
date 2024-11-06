import { Global, Module } from '@nestjs/common';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { AuthModule } from '../modules/auth/auth.module';
import { AsyncLocalStorageModule } from '../../../../libs/common/src/als/async-local-storage-module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './graphql.config';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig >({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      imports: [AuthModule, AsyncLocalStorageModule],
    }),
  ],
})
export class GraphqlModule {}