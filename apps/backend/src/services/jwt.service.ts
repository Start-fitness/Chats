import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private readonly secretKey: string;
    private readonly expiration: string;
    constructor(private readonly configService: ConfigService) {
        this.secretKey = this.configService.get<string>('JWT_SECRET');
        this.expiration = this.configService.get<string>('JWT_EXPIRATION');
    }
    sign(payload: object) {
        return sign(payload, this.secretKey, { expiresIn: this.expiration });
    }

    verify(token: string) {
        return verify(token, this.secretKey);
    }
}
