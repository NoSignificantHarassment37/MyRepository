import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service.js';
import { PersonaController } from './persona.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PersonaGateway } from './persona.gateway.js';

@Module({
  controllers: [PersonaController],
  providers: [PersonaService, PersonaGateway],
  imports: [PrismaModule],
})
export class PersonaModule {}
