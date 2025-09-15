import * as z from "zod";
import { SistemaPedidos } from "../Models/SistemaPedidos";
import { Producto } from "../Models/Producto";
export const sistemaPedidos = z.object({
    productos:Array<Producto>
})