import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { NFT } from "@prisma/client";
import { NFTsService } from "./nft.service";
import { Request } from 'express';
import { parse } from 'cookie';
import { AuthService } from "../auth/auth.service";
import { CollectionsService } from "../collections/collections.service";

@Controller('nfts')
export class NFTController {
  constructor(
    private readonly nftService: NFTsService,
    private readonly authService: AuthService,
    private readonly collectionService: CollectionsService
  ) { }

  @Get()
  async getNFTs(@Req() request: Request): Promise<NFT[]> {
    const cookie = request.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    return await this.nftService.nFTs({ where: { userId: user.id }});
  }

  @Post()
  async createNFT(@Req() request: Request, @Body() data: { address: string; collectionId: string; }): Promise<NFT> {
    await this.collectionService.updateCollection({where: {id: data.collectionId}, data: {mint: true}});
    const cookie = request.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    return await this.nftService.createNFT({
      address: data.address,
      user: {
        connect: { id: user.id }
      },
      collection: {
        connect: { id: data.collectionId }
      }
    })
  }
}