// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller.js';
import { UsersService } from './services/user.service.js';
import { UsersRepository } from './repositories/user.repository.js';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
})
export class UsersModule {}
