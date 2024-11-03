import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '../../../utils/config/config.service';
import { AccountsService } from 'apps/accounts/src/accounts.service';
import { JWTStrategyValidatePayload } from '../types/auth.types';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    readonly AccountsService: AccountsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  @MessagePattern('JwtStrategy.validate')
  async validate(payload: JWTStrategyValidatePayload) {
    //
  }
}