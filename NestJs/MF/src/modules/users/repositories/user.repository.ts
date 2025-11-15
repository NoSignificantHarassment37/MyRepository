// users/repositories/users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient, type User } from '../../../../prisma/generated/client.js';

@Injectable()
export class UsersRepository {
    private prisma = new PrismaClient();

    async create(data: {name: string, email: string}): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: number, data: {name?: string, email?: string}): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }

    async remove(id: number): Promise<User> {
        return this.prisma.user.delete({ where: { id } });
    }
}
