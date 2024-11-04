// auth.module.ts
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AsyncLocalStorage } from 'async_hooks';

@Module({
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 8877,
          },
        });
      },
    },
    AuthService,
    JwtService,
    AsyncLocalStorage,
  ],
  exports: ['AUTH_SERVICE', AuthService],
})
export class AuthModule {}