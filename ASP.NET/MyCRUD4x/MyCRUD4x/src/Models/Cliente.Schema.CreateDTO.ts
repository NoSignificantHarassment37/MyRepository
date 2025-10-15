import type * as Z from "zod";
const z = window.Zod;

export const clienteSchemaCreateDTO = z.object({
  nombre: z
    .string()
    .min(2, "Nombre demasiado corto.")
    .max(50, "Nombre demasiado largo."),
  direccion: z
    .string()
    .min(5, "Dirección demasiado corta.")
    .max(40, "Dirección demasiado larga."),
  telefono: z.string().max(12, "Dirección demasiado larga."),
});

export type ClienteCreateDTO = Z.infer<typeof clienteSchemaCreateDTO>;
