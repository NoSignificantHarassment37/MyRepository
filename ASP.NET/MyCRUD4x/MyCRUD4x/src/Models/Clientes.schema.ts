import type * as Z from 'zod';
const z = window.Zod;

export const ClienteSchema = z.object({
  nombre: z.string().min(2, "Nombre demasiado corto"),
  direccion: z.string().min(5).max(40),
  telefono: z.string().max(12)
});

export type Cliente = Z.infer<typeof ClienteSchema>;
