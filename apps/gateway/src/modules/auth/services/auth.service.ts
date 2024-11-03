import { ClientProxy } from '@nestjs/microservices';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthError } from '../auth.common';
import { JWTPayload, JWTStrategyValidatePayload, LoginPayload, RegisterPayload, TokenResponse } from '../types/auth.types';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly rpc: ClientProxy,
    private jwtService: JwtService,
    private readonly als: AsyncLocalStorage<RequestContext>
  ) {}

  async register(data: RegisterPayload): Promise<boolean> {
    return true;
  }

  async login(data: LoginPayload): Promise<TokenResponse> {
    return { accessToken: "123" };
  }

  async verifyToken(token: string): Promise<JWTStrategyValidatePayload> {
    return { id: "123", sessionId: "123", iat: 123, exp: 0 };
  }

  private generateJWT(payload: JWTPayload): string {
    return "";
  }
}