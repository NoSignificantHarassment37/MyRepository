import * as z from "zod";
export const productoSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().max(50),
    precio: z.number().positive()
});

export type ProductoSchema = z.infer<typeof productoSchema>;