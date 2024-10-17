import { Controller, Get, Post, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';

@Controller('api/preview')
export class PreviewController {
  @Post('ws')
  ws(@Req() request: Request): boolean {
    console.log(JSON.stringify(request.body));
    return true;
  }
}
