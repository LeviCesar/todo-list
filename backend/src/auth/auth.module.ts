
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    AuthService, 
    AccessTokenService, 
    RefreshTokenService,
  ],
  controllers: [AuthController],
  exports: [
    AuthService, 
    AccessTokenService,
  ],
})
export class AuthModule {}
