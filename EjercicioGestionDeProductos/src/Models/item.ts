import { ItemSchema, itemSchema } from "../Schemas/item.schema";
import { Producto } from "./producto";

export class Item {
  producto!: Producto;
  cantidad!: number;
  constructor(data: Partial<ItemSchema>) {
    const itemValidado = itemSchema.parse(data);
    this.producto = itemValidado.producto;
    this.cantidad = itemValidado.cantidad;
  }
  subtotal(): number {
    return this.producto.precio * this.cantidad;
  }
}
