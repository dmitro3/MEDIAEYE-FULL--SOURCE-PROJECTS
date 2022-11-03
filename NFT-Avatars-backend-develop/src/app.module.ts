import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload/upload.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collection.module';
import { PinataService } from './ipfs/pinata.service';
import { AvatarsModule } from './avatars/avatars.module';
import { NFTsModule } from './nft/nft.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    UsersModule,
    CollectionsModule,
    AvatarsModule,
    NFTsModule
  ],
  controllers: [
    AppController, 
    UploadController
  ],
  providers: [
    AppService, 
    PrismaService,
    PinataService
  ]  
})
export class AppModule {}
