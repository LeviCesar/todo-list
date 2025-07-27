import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private accessService: AccessTokenService,
    private refreshService: RefreshTokenService,    
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.userId,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.accessService.sign(payload),
      refresh_token: await this.refreshService.sign(payload),
    };
  }

  async refreshSession(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const payload = await this.refreshService.verify(refreshToken);
    return {
      access_token: await this.accessService.sign({
        sub: payload.sub,
        username: payload.username,
        email: payload.email,
      }),
    };
  }
}
