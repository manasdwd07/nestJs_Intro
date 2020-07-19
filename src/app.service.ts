import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello user, this is the homepage'
  };

  getOk(): string {
    return 'This route gets ok'
  }

}
