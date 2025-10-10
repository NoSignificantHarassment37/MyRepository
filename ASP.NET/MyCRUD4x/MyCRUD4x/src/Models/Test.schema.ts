import type * as Z from 'zod';
const z = window.Zod;

export const testSchema = z.object({
    nombre: z.string('El nombre debe ser una cadena de caracteres.').min(5, 'El nombre debe tener más de 5 caracteres.').max(50, 'El nombre debe tener menos de 50 caracteres.'),
    correo: z.email('El correo electrónico no es válido.'),
    edad: z.int('La edad debe ser un número entero.').min(0, 'La edad debe ser mayor a 0.').max(100, 'La edad debe ser menor a 100.'),
    fechaNacimiento: z.date('La fecha de nacimiento no es válida.')
});

export type TestSchema = Z.infer<typeof testSchema>;