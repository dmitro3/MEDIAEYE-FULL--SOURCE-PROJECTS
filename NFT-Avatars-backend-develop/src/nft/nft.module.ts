import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OtpService } from "../otp/otp.service";
import { AuthService } from "../auth/auth.service";
import { CollectionsService } from "../collections/collections.service";
import { PrismaService } from "../prisma.service";
import { UsersService } from "../users/users.service";
import { NFTController } from "./nft.controller";
import { NFTsService } from "./nft.service";

@Module({
  controllers: [NFTController],
  providers: [
    PrismaService,
    NFTsService,
    AuthService,
    CollectionsService,
    UsersService,
    JwtService,
    OtpService
  ]
})

export class NFTsModule {}