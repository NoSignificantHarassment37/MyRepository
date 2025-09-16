import { Producto } from "./producto";
import { Estado } from "../enums/estado";

export class SistemaPedidos{
    inventario!:Producto;
    constructor(){

    }
    agregarProducto(nombre:string, precio:number):void{

    }
    crearPedido(idProductos:number):void{

    }
    obtenerTotalPedido(idPedido:number):void{

    }
    actualizarEstadoPedido(idPedido:number, nuevoEstado:Estado):void{

    }

}