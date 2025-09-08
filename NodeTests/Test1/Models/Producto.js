export class Producto{
    constructor(id, nombre, precio){
        if(!Number.isInteger(id)){
            throw new TypeError(`id debe ser un numero entero.`);
        }
        if(typeof nombre !== "string"){
            throw new TypeError(`nombre debe ser un string.`);
        }
        if(typeof precio !== "number"){
            throw new TypeError(`precio debe ser un numero.`);
        }
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
    }
    get id(){
        return this.#id;
    }
    set id(value){
        if(!Number.isInteger(value)){
            throw new TypeError(`el nuevo id debe ser un numero entero.`);
        }
        this.#id = value;
    }
    get nombre(){
        return this.#nombre;
    }
    set nombre(value){
        if(typeof value !== "string"){
            throw new TypeError(`el nuevo nombre debe ser un string.`);
        }
        this.#nombre = value;
    }
    get precio(){
        return this.#precio;
    }
    set precio(value){
        if(typeof precio !== "number"){
            throw new TypeError(`precio debe ser un numero.`);
        }
        this.#precio = value; 
    }
    #id;
    #nombre;
    #precio;
}