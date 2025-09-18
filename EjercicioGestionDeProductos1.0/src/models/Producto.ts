import { productoSchema, ProductoSchema } from "../Schemas/producto.shema";
export class Producto {
  id!: number;
  nombre!: string;
  precio!: number;
  constructor(data: Partial<ProductoSchema>) {
    const validado = productoSchema.parse(data);

    this.id = validado.id;
    this.nombre = validado.nombre;
    this.precio = validado.precio;
  }
}
