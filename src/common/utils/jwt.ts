import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/JwtPayload';

@Injectable()
export class JWT {
  constructor(private configService: ConfigService) {}

  private getSecret(key: string): string {
    const secret = this.configService.get<string>(key);
    if (!secret) {
      throw new HttpException(
        `Missing secret key: ${key}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return secret;
  }

  generateJwtToken(payload: JwtPayload) {
    const accessSecret = this.getSecret('JWT_ACCESS_SECRET');
    const refreshSecret = this.getSecret('JWT_REFRESH_SECRET');

    const accessToken = sign(payload, accessSecret, {
      expiresIn: '15m',
    });

    const refreshToken = sign(payload, refreshSecret, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): JwtPayload {
    const accessSecret = this.getSecret('JWT_ACCESS_SECRET');
    try {
      return verify(token, accessSecret) as JwtPayload;
    } catch (err) {
      throw new HttpException(
        'Invalid or expired access token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  validateRefreshToken(token: string): JwtPayload {
    const refreshSecret = this.getSecret('JWT_REFRESH_SECRET');
    try {
      return verify(token, refreshSecret) as JwtPayload;
    } catch (err) {
      throw new HttpException(
        'Invalid or expired refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  refreshToken(refreshToken: string) {
    const payload = this.validateRefreshToken(refreshToken);
    const accessSecret = this.getSecret('JWT_ACCESS_SECRET');

    const newAccessToken = sign(payload, accessSecret, {
      expiresIn: '15m',
    });

    return { accessToken: newAccessToken };
  }
}
