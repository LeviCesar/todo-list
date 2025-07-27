import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AccessTokenService {
  constructor(private jwtService: JwtService) {}

  async sign(payload: any) {
    payload.tokenType = 'at+jwt';
    return this.jwtService.signAsync(payload, {
      jwtid: uuidv4(),
    });
  }

  async verify(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (payload.tokenType != 'at+jwt') {
        throw new UnauthorizedException('Invalid token type');
      } 
      return payload;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }

      if (err instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid JWT format');
      }

      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
