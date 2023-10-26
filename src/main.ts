import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // CORS 미들웨어를 사용하여 CORS 설정 적용
  app.enableCors({
    origin: ['https://studio.apollographql.com', 'http://localhost:4001'], // 허용할 출처
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'x-jwt'], // 허용할 헤더
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
