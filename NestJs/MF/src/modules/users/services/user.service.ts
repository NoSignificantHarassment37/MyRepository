// users/services/users.service.ts
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository.js';
import { type User } from '../../../../prisma/generated/client.js';

@Injectable()
export class UsersService {
    constructor(private usersRepo: UsersRepository) {}

    createUser(name: string, email: string): Promise<User> {
        return this.usersRepo.create({ name, email });
    }

    getAllUsers(): Promise<User[]> {
        return this.usersRepo.findAll();
    }

    getUserById(id: number): Promise<User | null> {
        return this.usersRepo.findOne(id);
    }

    updateUser(id: number, data: {name?: string, email?: string}): Promise<User> {
        return this.usersRepo.update(id, data);
    }

    deleteUser(id: number): Promise<User> {
        return this.usersRepo.remove(id);
    }
}
