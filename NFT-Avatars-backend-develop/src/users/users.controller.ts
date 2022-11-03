import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

// @UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) { }

  
  @Get()
  async getUsers(@Query() query): Promise<UserModel[]> {
    const skip = Number(query.skip);
    const take = Number(query.take);
    return this.userService.users({skip, take});
  }
  
  @Put('user/:id')
  async updateUserByid(@Param('id') id: string, @Body() userData: any): Promise<UserModel> {
    delete(userData.id);
    delete(userData.follower);
    delete(userData.following);
    return this.userService.updateUser({
      where: { id: id },
      data: userData
    });
  }

  @Put('following/:id')
  async updateUserFollowing(@Param('id') id: string, @Body() following: UserModel[]): Promise<UserModel> {
    let temp = [];
    following.map(followingUser => {
      temp.push(followingUser.id);
    });
    return this.userService.updateUser({
      where: {id: id},
      data: {
        followingIDs: temp
      }
    })
  }
}
