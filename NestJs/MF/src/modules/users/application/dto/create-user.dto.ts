/**
 * DTO para crear un usuario
 * Usado en la capa de aplicación
 */
export class CreateUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('El nombre es requerido');
    }
    if (!this.email || this.email.trim().length === 0) {
      throw new Error('El email es requerido');
    }
  }
}

