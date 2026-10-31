import { NestFactory } from '@nestjs/core'; // <-- Tambahkan ini
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js'; // <-- Tambahkan ini (dengan .js)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();