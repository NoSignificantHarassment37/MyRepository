import * as z from "zod";
import {productoSchema} from "./producto.shema";

export const itemSchema = z.object({
    producto: productoSchema,
    cantidad: z.number().int().positive()
});

export type ItemSchema = z.infer<typeof itemSchema>;