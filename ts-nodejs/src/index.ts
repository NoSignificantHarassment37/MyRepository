import * as z from 'zod';
import {Libro} from './Models/Libros.js';

const libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, prestado: false },
  { id: 2, titulo: '1984', autor: 'George Orwell', anio: 1949, prestado: false },
  { id: 3, titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', anio: 1954, prestado: false }
]

let libro:Libro = new Libro({id:1,titulo:`Hello world`,anio:2025});

console.log(libro);

function agregarLibro(titulo:number, autor:string, anio:number):void{

}
function prestarLibro(idLibro:number):void{

}
function devolverLibro(idLibro:number):void{

}
function buscarLibro(terminoBusqueda:string):void{

}
function listarDisponibles():void{

}

// Puedes agregar un registro de préstamos si lo consideras necesario.
// let prestamos = [];