import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, Otp } from "@prisma/client";
import { JWT_EXPIRY, JWT_SECRET_KEY } from "../common/config";
import { LoggedInToken } from "../users/objects/login-user.dto";
import { UsersService } from "../users/users.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import * as speakeasy from 'speakeasy';
import { optSecret } from "../common/config";
import { OtpService } from "../otp/otp.service";


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email: string, otp: string): Promise<User> {
    const userToAttempt: User = await this.usersService.user({ email: email });

    if (!!userToAttempt) {
      const _otp: Otp[] = await this.otpService.otps({
        where: { userId: userToAttempt.id, token: otp },
        orderBy: { updatedAt: "desc" },
        take: 1
      });
      const tokenValidates = speakeasy.totp.verify({
        secret: optSecret,
        encoding: 'base32',
        token: otp,
        window: 30,
      });

      if (tokenValidates) {
        const updated = await this.otpService.updateOtp({
          where: { id: _otp[0].id },
          data: { isVerfied: true }
        });
        const user = await this.usersService.user({ id: updated.userId });
        return user;
      } else {
        return null;
      }
    }
  }

  public getCookieWithJwtAccessToken(userId: number, isSecondFactorAuthenticated = false) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: `${JWT_EXPIRY}s`
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${JWT_EXPIRY}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
      expiresIn: `${JWT_EXPIRY}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${JWT_EXPIRY}`;
    return {
      cookie,
      token
    }
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: JWT_SECRET_KEY
    });
    if (payload.userId) {
      return this.usersService.user({id: payload.userId});
    }
  }
}