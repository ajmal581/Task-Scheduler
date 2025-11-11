import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  });

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Listen on backend port (avoid Next.js port)
  await app.listen(process.env.PORT ?? 3001);
  console.log(`Backend running on http://localhost:${process.env.PORT ?? 3001}`);
}
bootstrap();
