import {
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Body,
  BadRequestException,
  Param,
  NotFoundException,
  Request,
  HttpCode
} from "@nestjs/common";
import {
  UNKNOWN_PARAM,
  EMAIL_NOT_FOUND,
  OTP_ERROR,
  EXISTS,
  OTP_NOT_EXPIRED,
  NEW_PASSWORD_AND_CONFIRM_NEW_PASSWORD_ERROR,
  OTP_TIME_OUT,
  TOKEN_ALREADY_USED,
  EMAIL_ERROR,
  BLOCKED_ACCOUNT_ERROR,
} from "../common/constants/string";

import { LoggedInToken } from "../users/objects/login-user.dto";
import { JwtAuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import * as speakeasy from 'speakeasy';
import { optSecret } from "../common/config";
import { Otp, User } from "@prisma/client";
import { UsersService } from "../users/users.service";
import { OtpService } from "../otp/otp.service";
import { success } from "../common/base/httpResponse.interface";
import { EmailService } from "../email/email.service";
import { LocalAuthGuard } from "./local.auth.guard";


@Controller('auth/refresh')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private otpService: OtpService,
    private emailService: EmailService
  ) { }

  @Get('secret')
  async getSecret() {
    const secret = speakeasy.generateSecret({ length: 20 });
    return secret;
  }

  @Post('generate')
  async getOtp(
    @Body() body: { email: string; }
  ) {
    const email = body.email;
    const token = speakeasy.totp({
      secret: optSecret,
      encoding: 'base32'
    });

    const userToAttempt: User = await this.usersService.user({ email: email });
    let user: User;
    if (!userToAttempt) {
      user = await this.usersService.createUser({ email: email, communities: [{
        link: 'MEDIA EYE NFT Portal',
        status: 'member'
      }] });
    } else {
      user = userToAttempt;
    }

    const _otp: Otp[] = await this.otpService.otps({ where: { userId: user.id } });
    const currentTime: number = Date.now();
    if (_otp) {
      const k = await this.otpService.otps({
        where: { userId: user.id },
        orderBy: { updatedAt: "desc" },
        take: 1
      });
      if (k.length !== 0) {
        const diff = (currentTime - k[0].expiry) / 1000;

        const updateTime: number = Date.now();
        const createOtp = {
          token: token,
          user: {
            connect: { email: email }
          },
          expiry: updateTime + 15 * 60 * 1000
        };

        if (diff > 0) {
          await this.otpService.createOtp(createOtp);
          const _data =
            "Otp sent to registered email " +
            email +
            " " +
            "token:" +
            token;
          // send email
          await this.emailService.sendEmail(email, token);
          return success(_data);
        } else {
          const errorData = "Otp sent yet to expire in" + diff + "seconds";
          throw new BadRequestException(OTP_NOT_EXPIRED(errorData));
        }
      }
    }
    // for user requesting for the first time
    const updateTime: number = Date.now();
    const createOtp = {
      token: token,
      user: {
        connect: {email: email}
      },
      expiry: updateTime + 15 * 60 * 1000
    };

    await this.otpService.createOtp(createOtp);
    // send email
    await this.emailService.sendEmail(email, token);
    const _data =
      "Otp sent to registered email " + body.email + " " + "token:" + token;
    return success(_data);

  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('otp/email')
  async login(@Req() request) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    const {
      cookie: refreshTokenCookie,
      token: refreshToken
    } = this.authService.getCookieWithJwtRefreshToken(user.id);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return {
      user: user,
      msg: 'User logged in'
    };
  }
}