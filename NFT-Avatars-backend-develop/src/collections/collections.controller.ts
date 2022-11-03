import { Controller, Post, Body, UseGuards, Get, Req, Param } from "@nestjs/common";
import { Avatar, Collection } from "@prisma/client";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { CollectionsService } from "./collections.service";
import { parse } from 'cookie';
import { Request } from 'express';
import { AuthService } from "../auth/auth.service";
import { PinataService } from "../ipfs/pinata.service";
import { AvatarsService } from "../avatars/avatars.service";

@UseGuards(AuthenticatedGuard)
@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly authService: AuthService,
    private readonly pinataService: PinataService,
    private readonly avatarsService: AvatarsService
  ) {}

  @Get(':id')
  async getCollection(@Param('id') id: string ): Promise<Collection> {
    const findCollection = await this.collectionsService.collection({id: id});
    return findCollection;
  }

  @Get()
  async getCollections(@Req() request: Request): Promise<Collection[]> {
    const cookie = request.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    return await this.collectionsService.collections({where: {userId: user.id, mint: false}});
  }

  @Post()
  async createCollection(@Body() data: { name: string; type: string; chain: string; symbol: string; royalties: number; desc: string; userId: number; image: string;}): Promise<Collection> {
    return await this.collectionsService.createCollection({...data, mint: false});
  }

  @Post('json/ipfs')
  async pinJSON(@Body() data: {collection: Collection; metadata: any, avatars: Avatar[]}) {
    // add uri in avatars
    const uri = await this.pinataService.uploadJSONToIPFS({collection: data.collection.name, metadata: data.metadata});
    for(let i = 0; i < data.avatars.length; i++) {
      await this.avatarsService.updateAvatar({
        where: {id: data.avatars[i].id},
        data: {uri: `${uri}/${i}.json`}
      });
    }
    await this.collectionsService.updateCollection({
      where: {id: data.collection.id},
      data: {baseUri: uri}
    })
    return uri;
  }
}