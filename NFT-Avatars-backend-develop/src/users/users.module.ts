import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIRY, JWT_SECRET_KEY } from "src/common/config";
import { PassportModule } from "@nestjs/passport";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { OtpService } from "../otp/otp.service";
import { PrismaService } from "../prisma.service";


@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService
  ],
})
export class UsersModule {}