import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = parseInt(process.env.PORT ?? '3000'); // Asegurar que siempre sea string válido antes de parsear

  if (isNaN(port)) {
    console.error('Error: PORT environment variable is not a valid number. Using default port 3000.');
    await app.listen(3000);
  } else {
    await app.listen(port);
  }
}
bootstrap();
