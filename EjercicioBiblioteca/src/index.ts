import { Libro } from "./Models/Libro.js";

import { Library } from "./Models/Bibilioteca.js";

const libreria: Library = new Library();

libreria.agregarLibro({
  titulo: "Cien años de soledad",
  autor: "Gabriel García Marquez",
  anio: 1967,
});
libreria.agregarLibro({
  titulo: "1984",
  autor: "George owell",
  anio: 1949,
});
libreria.agregarLibro({
  titulo: "El señor de los anillos",
  autor: "J.R.R. Tolkien",
  anio: 1954,
});
console.log("info de todos los libros:" + libreria.libros);
libreria.prestarLibro(1);
console.log("prestado libro 1:" + libreria.libros);
libreria.devolverLibro(1);
console.log("Devuelto libro 1:" + libreria.libros);
console.log("Libro encontrado:" + libreria.buscarLibro("sole"));
libreria.prestarLibro(1);
libreria.prestarLibro(3);
console.log("Libros disponibles: ", libreria.listarDisponibles());
// Puedes agregar un registro de préstamos si lo consideras necesario.
// let prestamos = [];
