import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/', // 设置虚拟路径
  });
  app.setBaseViewsDir(join(__dirname, '../src/', 'views')); // 放视图的文件
  app.setViewEngine('hbs');

  const swaggerOption = new DocumentBuilder()
    .setTitle('nest-starter api document')
    .setDescription('nest starter project api document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup('doc', app, document);

  await app.listen(8080);
}
bootstrap();
