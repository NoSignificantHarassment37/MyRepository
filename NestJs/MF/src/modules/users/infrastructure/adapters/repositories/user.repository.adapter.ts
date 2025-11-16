import { Injectable } from '@nestjs/common';
import { IUserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';
import { PrismaService } from '../database/prisma.service';

/**
 * Adaptador de repositorio (Adapter)
 * Implementa el puerto definido en el dominio usando Prisma
 * Conecta la capa de dominio con la infraestructura
 */
@Injectable()
export class UserRepositoryAdapter implements IUserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user: { id: number; name: string; email: string; createdAt: Date; updatedAt: Date }) =>
      UserEntity.create({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );
  }

  async create(
    userData: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
      },
    });

    return UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async update(
    id: number,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(userData.name && { name: userData.name }),
        ...(userData.email && { email: userData.email }),
      },
    });

    return UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserEntity.create({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}

