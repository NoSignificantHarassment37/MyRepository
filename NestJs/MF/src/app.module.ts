import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

/**
 * Módulo raíz de la aplicación
 */
@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

