import { Controller, Get,Header, Post, UseInterceptors, UploadedFile, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './utils/file-uploading.utils';
import {diskStorage} from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ok')
  @Header('content-type','text/html')
  getOk():string{
    return this.appService.getOk();
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('image',1,{
      storage:diskStorage({
        destination:'./uploads',
        filename:editFileName
      }),
      fileFilter:imageFileFilter
    }))
  uploadFile(@UploadedFile() file){
    return 'File uploaded successfully. Check uploads folder';
  }

  @Get(':imgpath')
  seeUploadedFile(@Res() res, @Param('imgpath') image){
    res.sendFile(image,{root:'uploads'});
  }

}