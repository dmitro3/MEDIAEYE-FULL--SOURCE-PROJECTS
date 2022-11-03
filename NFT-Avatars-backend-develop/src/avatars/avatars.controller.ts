import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AvatarsService } from "./avatars.service";
import { Request } from "express";
import { Avatar } from "@prisma/client";
import { parse } from 'cookie';
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";


@Controller('avatars')
export class AvatarsController {
  constructor(
    private readonly avatarsService: AvatarsService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  async getAvatars(@Req() request: Request): Promise<Avatar[]> {
    const cookie = request.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    if(!user) return [];
    return await this.avatarsService.avatars({where: {userId: user.id}});
  }

  @Post()
  async createAvatar(@Body() data: {uri: string; filename: string; userId?: string; traits: any; editProfile: boolean;}): Promise<Avatar> {
    const editProfile = data.editProfile;
    delete data['editProfile'];
    const avatar = await this.avatarsService.createAvatar(data);
    if(editProfile) {
      await this.usersService.updateUser({
        where: {id: data.userId},
        data: { avatar: avatar.filename }
      });
    }
    return avatar;
  }
}