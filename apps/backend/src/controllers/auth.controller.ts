import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';

enum ListMessages {
    LOGIN_SUCCESS = "Login successful",
    INVALID_CRED = "Invalid credentials"
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post("login")
    async login(
        @Body() loginDto: { email: string; password: string },
        @Res() response: Response
    ) {

        const token = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!token) {
            return response.status(401).json({ message: ListMessages.INVALID_CRED });
        }
        response.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return response.status(200).json({ message: ListMessages.LOGIN_SUCCESS });
    }
}
