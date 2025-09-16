import { ProductoSchema } from "../Schemas/producto.shema";
import {Producto} from "./producto";

export class Item{
    producto!:Producto;
    cantidad!:number;
    constructor(data:Partial<ProductoSchema>){
        
    }
    subtotal():number{
        return this.producto.precio * this.cantidad;
    }
}