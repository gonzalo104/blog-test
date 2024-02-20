import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Running in ${process.env.NODE_ENV} mode`;
  }
}
