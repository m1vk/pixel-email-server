import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from '../modules/auth/auth.module';
import { GraphqlConfig } from './graphql.config';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      imports: [AuthModule],
      useClass: GraphqlConfig,
    }),
  ],
})
export class GraphqlModule {}
