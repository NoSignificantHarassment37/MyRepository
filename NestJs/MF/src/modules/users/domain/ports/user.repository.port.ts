import { UserEntity } from '../entities/user.entity.js';

/**
 * Puerto (Port) - Interfaz que define el contrato del repositorio
 * La capa de dominio define QUÉ necesita, no CÓMO se implementa
 */
export interface IUserRepositoryPort {
  findById(id: number): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  create(user: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity>;
  update(id: number, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

