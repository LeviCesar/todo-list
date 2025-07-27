
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenService } from './access-token.service';
import { RefreshTokenService } from './refresh-token.service';
import jwtConfig from 'src/config/jwt/jwt.config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),

    // Access Token JwtModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // privateKey: config.get<string>('jwt.access.privateKey'),
        // publicKey: config.get<string>('jwt.access.publicKey'),
        secret: config.get<string>('jwt.access.secret'),
        signOptions: config.get('jwt.access.signOptions'),
        verifyOptions: { algorithms: config.get('jwt.access.algorithm') },
      }),
    }),

    // Refresh Token JwtModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // privateKey: config.get<string>('jwt.refresh.privateKey'),
        // publicKey: config.get<string>('jwt.refresh.publicKey'),
        secret: config.get<string>('jwt.refresh.secret'),
        signOptions: config.get('jwt.refresh.signOptions'),
        verifyOptions: { algorithms: config.get('jwt.refresh.algorithm') },
      }),
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
