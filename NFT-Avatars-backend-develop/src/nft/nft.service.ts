import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NFT, Prisma } from '@prisma/client';

@Injectable()
export class NFTsService {
  constructor(private prisma: PrismaService) {}

  async nFT(
    nFTWhereUniqueInput: Prisma.NFTWhereUniqueInput,
  ): Promise<NFT | null> {
    return this.prisma.nFT.findUnique({
      where: nFTWhereUniqueInput,
    });
  }

  async nFTs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NFTWhereUniqueInput;
    where?: Prisma.NFTWhereInput;
    orderBy?: Prisma.NFTOrderByWithRelationInput;
  }): Promise<NFT[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.nFT.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { collection: true}
    });
  }

  async createNFT(data: Prisma.NFTCreateInput): Promise<NFT> {
    return this.prisma.nFT.create({
      data,
      include: {collection: true}
    });
  }

  async updateNFT(params: {
    where: Prisma.NFTWhereUniqueInput;
    data: Prisma.NFTUpdateInput;
  }): Promise<NFT> {
    const { where, data } = params;
    return this.prisma.nFT.update({
      data,
      where,
    });
  }

  async deleteNFT(where: Prisma.NFTWhereUniqueInput): Promise<NFT> {
    return this.prisma.nFT.delete({
      where,
    });
  }
}