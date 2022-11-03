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
  Req
} from '@nestjs/common';
import { Express, Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName } from '../utils/file-upload.utils';
import { diskStorage } from 'multer';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { unlink } from 'node:fs/promises';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs/promises';
import { v4 as uuidv4} from 'uuid';
import { PinataService } from '../ipfs/pinata.service';


const basePath = process.cwd();
const src = `${basePath}/files`;

@Controller('upload')
export class UploadController {
  constructor(
    private readonly pinataService: PinataService
  ) { }

  @UseGuards(AuthenticatedGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName
      })
    }
    ))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename
    };
    return response;
  }
  @UseGuards(AuthenticatedGuard)
  @Delete(':filename')
  async deleteUploadedFile(@Param('filename') filename: string) {
    try {
      await unlink(`${src}/${filename}`);
      console.log(`successfully deleted ${filename}`);
      return { msg: 'file is deleted' };
    } catch (error) {
      console.error('there was an error:', error.message);
    }
  }

  @Get(':filename')
  seeUploadedFile(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Get('stream/:filename')
  getVideoFile(@Param('filename') filename, @Res() res) {
    const file = createReadStream(join(process.cwd(), 'files', filename));
    file.pipe(res);
  }

  // save image from canvas data
  @Post('data')
  async uploadWithData(@Req() request: Request, @Res() res: Response) {
    let body = '';
    let post = '';
    let filename = '';
    request.on('data', (data) => {
      body += data;
    });
    request.on('end', async() => {
      post = JSON.parse(body);
      const data = post.replace(/^data:image\/\w+;base64,/, "");
      const buf = Buffer.from(data, 'base64');
      filename = `${uuidv4()}.png`;
      await writeFileToSystem(buf, filename);
      const ipfsUri = await this.pinataService.uploadFileWithPath(filename);
      res.send({uri: ipfsUri, filename: filename});
    });
  }
}
// write file helper
async function writeFileToSystem(buf: any, filename: string) {
  await fs.writeFile(`${src}/${filename}`, buf);
}