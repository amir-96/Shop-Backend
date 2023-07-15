import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: 'http://localhost:3000',
  };

  app.use(cors(corsOptions)); // Enable CORS only for http://localhost:3000

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}

bootstrap();
