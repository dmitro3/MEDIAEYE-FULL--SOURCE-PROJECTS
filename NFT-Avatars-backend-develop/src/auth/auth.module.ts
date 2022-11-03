import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JWT_EXPIRY, JWT_SECRET_KEY } from "../common/config";
import { EmailService } from "../email/email.service";
import { OtpService } from "../otp/otp.service";
import { PrismaService } from "../prisma.service";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { SessionSerializer } from "./session.serializer";


@Module({
  imports: [
    PassportModule.register({session: true}),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    PrismaService,
    AuthService,
    OtpService,
    EmailService,
    LocalStrategy,
    SessionSerializer,
    UsersService,
    JwtService
  ]
})
export class AuthModule {}