import { Controller, Get,Header } from '@nestjs/common';
import { AppService } from './app.service';

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


}