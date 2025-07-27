import { registerAs } from '@nestjs/config';
// import * as fs from 'fs';
// import * as path from 'path';

export default registerAs('jwt', () => ({
  access: {
    // privateKey: fs.readFileSync(path.resolve(process.env.JWT_ACCESS_PRIVATE_KEY), 'utf-8'),
    // publicKey: fs.readFileSync(path.resolve(process.env.JWT_ACCESS_PUBLIC_KEY), 'utf-8'),
    secret:process.env.ACCESS_TOKEN_JWT_SECRET,
    signOptions: {
    //   algorithm: 'RS256',
      algorithm: 'HS256',
      expiresIn: '15m',
    },
  },
  refresh: {
    // privateKey: fs.readFileSync(path.resolve(process.env.JWT_REFRESH_PRIVATE_KEY), 'utf-8'),
    // publicKey: fs.readFileSync(path.resolve(process.env.JWT_REFRESH_PUBLIC_KEY), 'utf-8'),
    secret: process.env.REFRESH_TOKEN_JWT_SECRET,
    signOptions: {
    //   algorithm: 'RS256',
      algorithm: 'HS256',
      expiresIn: '2d',
    },
  },
}));
