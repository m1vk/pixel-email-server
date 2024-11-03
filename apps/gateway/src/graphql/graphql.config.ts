import { SystemHeaders } from 'libs/common/src/request-contenxt';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { MercuriusDriverConfig } from '@nestjs/mercurius';
import { RequestContext } from '@nestjs/microservices';
import { AsyncLocalStorage } from 'async_hooks';
import { ExecutionResult } from 'graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { PubSub } from 'graphql-subscriptions';
import { ObjMap } from 'graphql/jsutils/ObjMap';
import { MercuriusContext, defaultErrorFormatter } from 'mercurius';
import { AuthService } from '../modules/auth/services/auth.service';

export interface IWsParams {
  readonly Authorization?: string;
}

@Injectable()
export class GraphqlConfig implements GqlOptionsFactory<MercuriusDriverConfig> {
  logger = new Logger(GraphqlConfig.name);
  
  constructor(
    readonly authService: AuthService,
    readonly als: AsyncLocalStorage<RequestContext>,
  ) {}

  createGqlOptions(): Omit<MercuriusDriverConfig, 'driver'> | Promise<Omit<MercuriusDriverConfig, 'driver'>> {
    const typePathsBase = './**/gateway/**/*.gql';
    const config: Omit<MercuriusDriverConfig, 'driver'> = {
      typePaths: [typePathsBase],
      fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
      context: (ctx: any) => { 
        this.logger.debug('gql body: %o, headers: %o', ctx.body, ctx.headers);
        const { req, connectionParams, extra } = ctx;
        return { req, connectionParams, extra };
      },
      graphiql: true,
      resolvers: { JSON: GraphQLJSON },
      errorFormatter: (result, context) => this.errorFormatter(result, context),
    };
    return config;
  }

  errorFormatter(
    result: ExecutionResult<ObjMap<unknown>, ObjMap<unknown>> & Required<Pick<ExecutionResult<ObjMap<unknown>, ObjMap<unknown>>, 'errors'>>,
    context: MercuriusContext,
  ) {
    this.logger.warn('gql error formatter: %o', result);
    const formatter = defaultErrorFormatter(result, context);
    const store = this.als.getStore();
    if (!store) {
      return {
        statusCode: formatter.statusCode || 500,
        response: formatter.response,
      };
    }

    const requestId = (store as any)[SystemHeaders.xRequestId];
    formatter.response.data = {
      ...formatter.response.data,
      requestId: requestId || 'N/A',
    };
    
    return {
      statusCode: formatter.statusCode || 500,
      response: formatter.response,
    };
  }
}
