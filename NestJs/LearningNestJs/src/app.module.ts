import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service.js';
import { PersonaModule } from './persona/persona.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PersonaModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
