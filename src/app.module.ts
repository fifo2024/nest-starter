import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { BosController } from './controllers/bos/bos.controller';
import { StreamController } from './controllers/stream/stream.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, BosController, StreamController],
  providers: [AppService],
})
export class AppModule {}
