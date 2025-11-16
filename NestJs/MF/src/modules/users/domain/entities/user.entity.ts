/**
 * Entidad de dominio User
 * Representa la entidad de negocio sin dependencias de infraestructura
 */
export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }): UserEntity {
    return new UserEntity(
      data.id,
      data.name,
      data.email,
      data.createdAt,
      data.updatedAt,
    );
  }

  // Métodos de dominio
  updateName(name: string): UserEntity {
    return new UserEntity(
      this.id,
      name,
      this.email,
      this.createdAt,
      new Date(),
    );
  }

  updateEmail(email: string): UserEntity {
    return new UserEntity(
      this.id,
      this.name,
      email,
      this.createdAt,
      new Date(),
    );
  }
}

