import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Body,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiProperty, ApiBody, ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('user')
export class UserController {
  @Post('create')
  @ApiBody({ description: '消息内容' })
  create(@Body() { message }): string {
    console.log(message);
    return `This action adds a new user ${message}`;
  }

  @Get('findAll')
  @ApiQuery({ name: 'cat', description: '描述' })
  findAll(@Query() { cat }): string {
    console.log(cat);
    return 'This action returns all cats ' + cat;
  }

  @Get('getUser')
  getUser(): Object {
    return {
      status: 200,
      success: true,
      message: {},
      result: {
        role: 'user',
        id: '123456',
        name: 'zhaoyadong',
      },
    };
  }
}
