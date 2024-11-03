import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../../utils/config/config.module';
import { ConfigService } from '../../utils/config/config.service';
import { AuthGuard } from './decorator/auth.guard'
import { AuthMutationResolver } from './resolvers/auth.mutation.resolver';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy'
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ jwtConfig }: ConfigService) => ({
        secret: jwtConfig.secret,
        signOptions: {
          expiresIn: jwtConfig.expiresIn,
        },
      }),
    }),
  ],
  providers: [AuthGuard, AuthMutationResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
