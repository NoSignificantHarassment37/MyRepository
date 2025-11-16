/**
 * Value Object para Email
 * Encapsula la lógica de validación del email
 */
export class Email {
  private constructor(private readonly value: string) {
    this.validate(value);
  }

  static create(email: string): Email {
    return new Email(email);
  }

  getValue(): string {
    return this.value;
  }

  private validate(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

