import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { IUserRepositoryPort } from '../domain/ports/user.repository.port';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Email } from '../domain/value-objects/email.vo';
import { UserDomainService } from '../domain/services/user-domain.service';

/**
 * Servicio de aplicación (Use Case)
 * Orquesta las operaciones entre dominio e infraestructura
 * No contiene lógica de negocio, solo coordina
 */
@Injectable()
export class UserApplicationService {
  constructor(
    @Inject('IUserRepositoryPort')
    private readonly userRepository: IUserRepositoryPort,
    private readonly userDomainService: UserDomainService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    // Validar email único
    const email = Email.create(dto.email);
    const existingUser = await this.userRepository.findByEmail(email.getValue());
    
    if (existingUser) {
      throw new Error('El email ya está en uso');
    }

    // Crear entidad de dominio
    const user = await this.userRepository.create({
      name: dto.name,
      email: email.getValue(),
    } as Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>);

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findById(id);
    
    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }

    // Si se actualiza el email, validar que no esté duplicado
    if (dto.email) {
      const email = Email.create(dto.email);
      const userWithEmail = await this.userRepository.findByEmail(email.getValue());
      
      if (userWithEmail && userWithEmail.id !== id) {
        throw new Error('El email ya está en uso');
      }
    }

    return this.userRepository.update(id, dto as Partial<UserEntity>);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await this.userRepository.delete(id);
  }
}

