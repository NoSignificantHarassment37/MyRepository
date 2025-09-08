import {Producto} from './Producto.js';

export class CartItem{
    constructor(producto, cantidad){
        if(!(producto instanceof Producto)){
            throw TypeError(`El parametro 'producto' debe ser del tipo 'Producto'.`);
        }
        if(!Number.isInteger(cantidad)){
            throw new TypeError(`El parametro 'cantidad' debe ser del tipo 'Number' y entero.`);
        }
        this.#cantidad = cantidad;
        this.#producto = producto;
    }
    get producto(){
        return this.#producto;
    }
    set producto(value){
        if(!(value instanceof Producto)){
            throw TypeError(`El valor nuevo debe ser del tipo 'Producto'.`);
        }
        this.#producto = value;
    }
    get cantidad(){
        return this.#cantidad;
    }
    set cantidad(value){
        if(!Number.isInteger(value)){
            throw new TypeError(`La nueva cantidad debe ser del tipo 'Number' y entero.`);
        }
        this.#cantidad = value;
    }
    #producto;
    #cantidad;
}