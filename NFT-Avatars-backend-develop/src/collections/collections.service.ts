import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Collection, Prisma } from '@prisma/client';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async collection(
    collectionWhereUniqueInput: Prisma.CollectionWhereUniqueInput,
  ): Promise<Collection | null> {
    return this.prisma.collection.findUnique({
      where: collectionWhereUniqueInput,
    });
  }

  async collections(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CollectionWhereUniqueInput;
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput;
  }): Promise<Collection[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.collection.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCollection(data: Prisma.CollectionCreateInput): Promise<Collection> {
    return this.prisma.collection.create({
      data,
    });
  }

  async updateCollection(params: {
    where: Prisma.CollectionWhereUniqueInput;
    data: Prisma.CollectionUpdateInput;
  }): Promise<Collection> {
    const { where, data } = params;
    return this.prisma.collection.update({
      data,
      where,
    });
  }

  async deleteCollection(where: Prisma.CollectionWhereUniqueInput): Promise<Collection> {
    return this.prisma.collection.delete({
      where,
    });
  }
}