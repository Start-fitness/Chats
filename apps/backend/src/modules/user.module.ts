import { Module } from '@nestjs/common';
import {User} from "../models/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "../controllers/auth.controller";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {JwtService} from "../services/jwt.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
})
export class UserModule {}
