import { Logger } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthMutation, LoginDto, RegisterDto } from 'apps/gateway/src/utils/graphql/types/graphql';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '../types/auth.types';

@Resolver(() => AuthMutation)
export class AuthMutationResolver {
  private readonly logger = new Logger(AuthMutationResolver.name);

  constructor(
    private authService: AuthService) {}

  @Mutation(() => AuthMutation)
  async Auth() {
    return {};
  }

  @ResolveField('register')
  async register(@Args('data') data: RegisterDto): Promise<boolean> {
    console.log("Запрос на регистрацию")
    return true;
  }

  @ResolveField('login')
  async login(@Args('data') data: LoginDto): Promise<TokenResponse> {
    return { accessToken: "123" };
  }
}