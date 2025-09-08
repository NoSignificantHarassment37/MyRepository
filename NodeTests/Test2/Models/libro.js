import { ExceptionMessage } from "./ExceptionMessages";

export class Libro{
    constructor(id, titulo, autor, anio, prestado){
        if(!Number.isInteger(id)){
            throw new TypeError(`El  parametro de constructor 'id' debe ser de tipo 'Number' y sin decimales.`);
        }
        if(typeof titulo !== `string`){
            throw new TypeError(`El parametro de constructor 'titulo' debe ser de tipo 'String'.`);
        }
        if(titulo.length > 50){
            throw new RangeError(`La propiedad 'length' del parametro 'titulo' debe ser menor a 50.`);
        }
        if(typeof autor !== `string`){
            throw new TypeError(`El parametro de constructor 'anio' debe ser de tipo 'String'.`)
        }
        if(autor.length > 50){
            throw new RangeError(`La propiedad 'length' del parametro 'autor' debe ser menor a 50.`);
        }
        if(!Number.isInteger(anio)){
            throw new TypeError(`El parametro de constructor 'anio' debe ser de tipo 'Number' y sin decimales.`)
        }
    }
}