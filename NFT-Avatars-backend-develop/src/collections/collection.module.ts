import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { OtpService } from "../otp/otp.service";
import { PrismaService } from "../prisma.service";
import { CollectionsService } from "./collections.service";
import { CollectionsController } from "./collections.controller";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { PinataService } from "../ipfs/pinata.service";
import { AvatarsService } from "../avatars/avatars.service";


@Module({
  controllers: [CollectionsController],
  providers: [
    PrismaService,
    CollectionsService,
    AuthService,
    UsersService,
    OtpService,
    JwtService,
    PinataService,
    AvatarsService
  ],
})
export class CollectionsModule {}