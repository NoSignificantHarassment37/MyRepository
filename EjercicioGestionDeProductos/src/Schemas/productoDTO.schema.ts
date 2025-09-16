import * as z from "zod";
export const productoDTOSchema = z.object({
    nombre: z.string().max(50),
    precio: z.number().positive()
});
export type ProductoDTOSchema = z.infer<typeof productoDTOSchema>;