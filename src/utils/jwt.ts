import { Injectable } from '@nestjs/common'
import { sign, verify } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../common/types/JwtPayload';

@Injectable()
export class JWT {
    constructor(private configService: ConfigService) { }
    generateJwtToken(payload: JwtPayload) {
        const secretKey = this.configService.get('JWT_SECRET');
        if (secretKey) {
            return sign(payload, secretKey, { expiresIn: '5h' });
        } else {
            throw new Error('The secret key is required');
        }
    }

    isJwtTokenValid(token: string) {
        const secretKey = this.configService.get('JWT_SECRET');
        return verify(token, secretKey) as JwtPayload
    }
}