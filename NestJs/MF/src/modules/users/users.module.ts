import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserApplicationService } from './application/services/user-application.service';
import { UserRepositoryAdapter } from './infrastructure/adapters/repositories/user.repository.adapter';
import { PrismaService } from './infrastructure/database/prisma.service';
import { UserDomainService } from './domain/services/user-domain.service';

/**
 * Módulo de Users
 * Configura las dependencias usando inyección de dependencias de NestJS
 * Conecta los puertos con los adaptadores
 */
@Module({
  controllers: [UserController],
  providers: [
    // Servicios de aplicación
    UserApplicationService,
    // Servicios de dominio
    UserDomainService,
    // Adaptadores de infraestructura
    {
      provide: 'IUserRepositoryPort',
      useClass: UserRepositoryAdapter,
    },
    // Servicios de infraestructura
    PrismaService,
  ],
  exports: [UserApplicationService],
})
export class UsersModule {}
