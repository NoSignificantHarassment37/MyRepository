import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstrap de la aplicación NestJS
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración global
  app.setGlobalPrefix('api');
  
  // CORS (si es necesario)
  app.enableCors();
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Aplicación corriendo en: http://localhost:${port}/api`);
}

bootstrap();

