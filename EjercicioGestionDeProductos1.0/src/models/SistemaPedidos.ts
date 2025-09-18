import { Producto } from "./producto";
import { Estado } from "../enums/estado";
import {
  SistemaPedidosSchema,
  sistemaPedidosSchema,
} from "../Schemas/sistemaPedidos.schema";
import { Pedido } from "./pedido";
import { cantidadSchema } from "../Schemas/item.schema";
import {
  idSchema,
  nombreSchema,
  precioSchema,
  ProductoSchema,
} from "../Schemas/producto.shema";
import { PedidoSchema } from "../Schemas/pedido.schema";
import * as z from "zod";

const crearPedidoDTOSchema = z.object({
  id: idSchema,
  cantidad: cantidadSchema,
});

type CrearPedidoDTO = z.infer<typeof crearPedidoDTOSchema>;

export class SistemaPedidos {
  private productosIdIncrementable: number = 1;
  private pedidosIdIncrementable: number = 1;
  productos!: Array<ProductoSchema>;
  pedidos!: Array<PedidoSchema>;
  constructor(data: Partial<SistemaPedidosSchema>) {
    const validado = sistemaPedidosSchema.parse(data);

    this.pedidos = validado.pedidos;
    this.productos = validado.productos;
  }
  agregarProducto(nombre: string, precio: number): void {
    const nombreValidado = nombreSchema.parse(nombre);
    const precioValidado = precioSchema.parse(precio);
    const id: number = this.productosIdIncrementable++;

    const productosCopia: Array<ProductoSchema> = [
      ...this.productos,
      new Producto({
        id: id,
        nombre: nombreValidado,
        precio: precioValidado,
      }),
    ];

    this.productos = productosCopia;
  }
  crearPedido(crearPedidoDTO: CrearPedidoDTO): void {
    const pedidoDTOValidado = crearPedidoDTOSchema.parse(crearPedidoDTO);

    const idTemp = this.productosIdIncrementable++;
    const fechaTemp = new Date();

    const pedidosCopia = [
      ...this.pedidos,
      new Pedido({
        id: idTemp,
        fecha: fechaTemp,
        estado: undefined,
        items: [],
      }),
    ];
  }
  obtenerTotalPedido(idPedido: number): void {}
  actualizarEstadoPedido(idPedido: number, nuevoEstado: Estado): void {}
}
