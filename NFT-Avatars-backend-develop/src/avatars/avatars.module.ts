import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { OtpService } from "../otp/otp.service";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";
import { AvatarsController } from "./avatars.controller";
import { AvatarsService } from "./avatars.service";


@Module({
  controllers: [AvatarsController],
  providers: [
    AvatarsService,
    PrismaService,
    AuthService,
    UsersService,
    OtpService,
    JwtService
  ]
})

export class AvatarsModule {};