import * as z from "zod";
export const productoSchema = z.object({
    id: z.number().int().positive(),
    nombre: z.string().max(50),
    precio: z.number().positive()
});

export const idSchema = productoSchema.shape.id;
export const nombreSchema = productoSchema.shape.nombre;
export const  precioSchema = productoSchema.shape.precio;

export type ProductoSchema = z.infer<typeof productoSchema>;