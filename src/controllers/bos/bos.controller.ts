import { Controller, Get, Post, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';

@Controller('api/bos')
export class BosController {
  @Post('fileupload')
  fileUpload(@Req() request: Request): any {
    console.log(request);
    return {
      fileId: '23432432432432',
      url: 'http://www.abcstatic.com/pdf/01100200081180955723.pdf',
    };
  }

  @Post('create')
  create(@Req() request: Request): boolean {
    console.log(JSON.stringify(request.body));
    return true;
  }
}
