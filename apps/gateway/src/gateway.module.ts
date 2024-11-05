import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './graphql/graphql.module';
import { AsyncLocalStorage } from 'async_hooks';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNTS_SERVICE',
        transport: Transport.NATS,  
        options: {
          url: 'nats://localhost:4222', 
        },
      },
    ]),
    ConfigModule.forRoot(),
    GraphqlModule,
    AsyncLocalStorage
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
