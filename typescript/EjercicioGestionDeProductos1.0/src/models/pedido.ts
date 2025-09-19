import * as z from "zod";
import { Estado } from "../enums/estado";
import { Producto } from "./producto";
import { PedidoSchema, pedidoSchema } from "../Schemas/pedido.schema";
import { ItemSchema } from "../Schemas/item.schema";

export class Pedido {
  id!: number;
  fecha!: Date;
  estado!: Estado;
  items!: Array<ItemSchema>;
  constructor(data: Partial<PedidoSchema>) {
    const validado = pedidoSchema.parse(data);

    this.id = validado.id;
    this.fecha = validado.fecha;
    this.estado = validado.estado;
    this.items = validado.items;
  }
}
