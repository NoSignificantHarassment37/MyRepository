import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Express } from 'express';
import { MyHttpExceptionFilter } from './exception-filters/http-exception.filter.js';
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalFilters(new MyHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // Truco para desactivar los headers de x-powered-by, que evitan que se filtre qué tecnología se está usando en el backend.
  const express: unknown = app.getHttpAdapter().getInstance();
  if (esInstanciaExpress(express)) {
    express.disable('x-powered-by');
  }
  await app.listen(process.env.PORT ?? 3001);
}
function esInstanciaExpress(obj: unknown): obj is Express {
  return (
    typeof obj === 'function' &&
    obj !== null &&
    'use' in obj &&
    typeof obj.use === 'function' &&
    'listen' in obj &&
    typeof obj.listen === 'function'
  );
}
bootstrap();
