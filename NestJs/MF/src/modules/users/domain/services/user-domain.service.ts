import { UserEntity } from '../entities/user.entity.js';
import { Email } from '../value-objects/email.vo.js';

/**
 * Servicio de dominio
 * Contiene lógica de negocio que no pertenece a una entidad específica
 */
export class UserDomainService {
  /**
   * Valida que el email no esté duplicado
   */
  validateUniqueEmail(
    email: Email,
    existingUsers: UserEntity[],
  ): boolean {
    return !existingUsers.some(
      (user) => user.email === email.getValue(),
    );
  }

  /**
   * Calcula si un usuario es activo basado en reglas de negocio
   */
  isUserActive(user: UserEntity): boolean {
    // Lógica de negocio: por ejemplo, usuarios creados hace menos de 1 año
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return user.createdAt > oneYearAgo;
  }
}

