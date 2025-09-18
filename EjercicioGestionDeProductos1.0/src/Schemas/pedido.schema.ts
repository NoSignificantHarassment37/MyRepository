import * as z from "zod";
import { estado } from "../enums/estado";
import { itemSchema } from "./item.schema";

export const pedidoSchema = z
  .object({
    id: z.number().int().positive(),
    fecha: z.date(),
    estado: z.enum(estado),
    items: z.array(itemSchema),
  })
  .strict();

export type PedidoSchema = z.infer<typeof pedidoSchema>;
