import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Avatar, Prisma } from '@prisma/client';

@Injectable()
export class AvatarsService {
  constructor(private prisma: PrismaService) {}

  async avatar(
    avatarWhereUniqueInput: Prisma.AvatarWhereUniqueInput,
  ): Promise<Avatar | null> {
    return this.prisma.avatar.findUnique({
      where: avatarWhereUniqueInput,
    });
  }

  async avatars(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AvatarWhereUniqueInput;
    where?: Prisma.AvatarWhereInput;
    orderBy?: Prisma.AvatarOrderByWithRelationInput;
  }): Promise<Avatar[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.avatar.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAvatar(data: Prisma.AvatarCreateInput): Promise<Avatar> {
    return this.prisma.avatar.create({
      data,
    });
  }

  async updateAvatar(params: {
    where: Prisma.AvatarWhereUniqueInput;
    data: Prisma.AvatarUpdateInput;
  }): Promise<Avatar> {
    const { where, data } = params;
    return this.prisma.avatar.update({
      data,
      where,
    });
  }

  async deleteAvatar(where: Prisma.AvatarWhereUniqueInput): Promise<Avatar> {
    return this.prisma.avatar.delete({
      where,
    });
  }
}