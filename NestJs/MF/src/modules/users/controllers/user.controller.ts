// users/controllers/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/user.service.js';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() body: {name: string, email: string}) {
        return this.usersService.createUser(body.name, body.email);
    }

    @Get()
    findAll() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.getUserById(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: {name?: string, email?: string}) {
        return this.usersService.updateUser(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }
}
