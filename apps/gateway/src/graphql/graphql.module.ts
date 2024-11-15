import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './graphql.config';

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig >({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
  ],
})
export class GraphqlModule {}