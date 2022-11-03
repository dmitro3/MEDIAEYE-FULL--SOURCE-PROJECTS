import { Injectable } from "@nestjs/common";
import { Otp, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";


@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService
  ) {}

  async otp(
    otpWhereUniqueInput: Prisma.OtpWhereUniqueInput
  ): Promise<Otp | null> {
    return this.prisma.otp.findUnique({
      where: otpWhereUniqueInput
    });
  }

  async otps(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OtpWhereUniqueInput;
    where?: Prisma.OtpWhereInput;
    orderBy?: Prisma.OtpOrderByWithRelationInput;
  }): Promise<Otp[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.otp.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createOtp(data: Prisma.OtpCreateInput): Promise<Otp> {
    return this.prisma.otp.create({
      data
    });
  }

  async updateOtp(params: {
    where: Prisma.OtpWhereUniqueInput;
    data: Prisma.OtpUpdateInput;
  }): Promise<Otp> {
    const { where, data} = params;
    return this.prisma.otp.update({
      data,
      where,
    });
  }
}