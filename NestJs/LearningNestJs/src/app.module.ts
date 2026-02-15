import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service.js';
import { PersonaModule } from './persona/persona.module.js';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PersonaModule,
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
