import * as z from "zod";
import { pedidoSchema } from "./pedido.schema";
import { productoSchema } from "./producto.shema";

export const sistemaPedidosSchema = z
  .object({
    pedidos: z.array(pedidoSchema),
    productos: z.array(productoSchema),
  })
  .strict();

export type SistemaPedidosSchema = z.infer<typeof sistemaPedidosSchema>;
