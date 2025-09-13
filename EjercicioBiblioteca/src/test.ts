import * as z from 'zod';

// Esquema de validación con Zod
const UsuarioSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: z.email("Correo no valido."),
  edad: z.number().int().positive().max(120, "Edad máxima permitida: 120"),
});

// Tipo inferido desde el esquema
type UsuarioData = z.infer<typeof UsuarioSchema>;

class Usuario {
  private static contadorUsuarios: number = 0;
  private id: number;
  private nombre: string;
  private correo: string;
  private edad: number;

  constructor(datos: UsuarioData) {
    // Validar los datos antes de asignar
    const validado = UsuarioSchema.parse(datos);

    // Incrementar contador estático
    Usuario.contadorUsuarios++;

    // Asignar propiedades privadas
    this.id = Usuario.contadorUsuarios;
    this.nombre = validado.nombre;
    this.correo = validado.correo;
    this.edad = validado.edad;
  }

  // Método para obtener datos públicos
  public getResumen(): string {
    return `Usuario #${this.id}: ${this.nombre}, ${this.correo}, Edad: ${this.edad}`;
  }

  // Método estático para saber cuántos usuarios hay
  public static getCantidadUsuarios(): number {
    return Usuario.contadorUsuarios;
  }
}

// ✅ Crear un usuario válido
const usuario1 = new Usuario({
  nombre: "Lucía",
  correo: "lucia@mail.com",
  edad: 29
});

console.log(usuario1.getResumen()); // Usuario #1: Lucía, lucia@mail.com, Edad: 29
console.log("Usuarios totales:", Usuario.getCantidadUsuarios());

// ❌ Crear un usuario inválido (lanzará error por Zod)
try {
  const usuario2 = new Usuario({
    nombre: "A",
    correo: "correo-malo",
    edad: -5
  });
} catch (error) {
  console.error("Error al crear usuario:", error);
}
