import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { setTimeout } from 'timers';
import { AuthError } from '../auth.common';
import { JWTPayload, JWTStrategyValidatePayload, LoginPayload, RegisterPayload, TokenResponse } from '../types/auth.types';
import { ConfigService } from '../../../utils/config/config.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async register(data: RegisterPayload): Promise<boolean> {
    return true;
  }

  async login(data: LoginPayload) : Promise<TokenResponse> {
    return { accessToken: "12" };
  }

  async verifyToken(token: string): Promise<JWTStrategyValidatePayload> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.jwtConfig.secret,
    });

    return payload;
  }

  private generateJWT(payload: JWTPayload): string {
    return this.jwtService.sign(payload, this.configService.jwtConfig);
  }
}
