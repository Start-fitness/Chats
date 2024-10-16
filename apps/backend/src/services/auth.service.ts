import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) {
    }

    async sign(email: string): Promise<string> {
        const payload = { sub: 1, email };
        return this.jwtService.sign(payload);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return await this.sign(email);
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
}
