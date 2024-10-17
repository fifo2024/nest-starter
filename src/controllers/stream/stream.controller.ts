import { Controller, Get, Post, Req, Res, HttpCode } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('api/stream')
export class StreamController {
  @Get('/')
  sendStream(@Req() req: Request, @Res() res: Response) {
    const fileName = '.' + req.url;
    console.log(fileName);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('retry: 10000\n');
    res.write('event: connecttime\n');
    res.write('data: ' + new Date() + '\n\n');
    res.write('data: ' + new Date() + '\n\n');

    const interval = setInterval(function () {
      console.log('interval::', new Date());
      res.write('data: ' + new Date() + '\n\n');
    }, 1000);

    req.socket.addListener('close', function () {
      console.log('interval:: close');
      clearInterval(interval);
    });
  }
}
