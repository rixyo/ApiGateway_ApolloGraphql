import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from '../../graphql.classes';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query('login')
  async loging(@Args('input') input: LoginUserInput) {}
  @Query('refreshToken')
  async refreshToken(@Args('user') user:LoginUserInput) {}
}
