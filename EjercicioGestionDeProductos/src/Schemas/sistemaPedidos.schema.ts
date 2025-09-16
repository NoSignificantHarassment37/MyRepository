import * as z from "zod";
import { itemSchema } from "./item.schema";
import { productoSchema } from "./producto.shema";

export const sistemaPedidosSchema = z.object({
    pedidos:z.array(itemSchema),
    productos: z.array(productoSchema)
});