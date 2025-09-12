import * as z from "zod";
import {
  Libro,
  libroSchema,
  tituloSchema,
  anioSchema,
  autorSchema,
} from "./Models/Libros.js";

let libros: Array<Libro> = [
  new Libro({
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Marquez",
    anio: 1967,
    prestado: false,
  }),
  new Libro({
    id: 2,
    titulo: "1984",
    autor: "George owell",
    anio: 1949,
    prestado: false,
  }),
  new Libro({
    id: 3,
    titulo: "El señor de los anillos",
    autor: "J.R.R. Tolkien",
    anio: 1954,
    prestado: false,
  }),
];

let keep_auto_increment: number = libros.length + 1;
const idShema = libroSchema.shape.id;

const pushArgumentDTO = z.object({
  autor: z.string().max(100),
  anio: z.int().positive(),
  titulo: z.string().max(100),
});

type LibroDTO = z.infer<typeof pushArgumentDTO>;

function agregarLibro(data: LibroDTO): void {
  const validado: LibroDTO = pushArgumentDTO.parse(data);
  const idTemp: number = keep_auto_increment++;
  const prestadoTemp: boolean = false;

  libros.push(
    new Libro({
      id: idTemp,
      titulo: validado.titulo,
      autor: validado.autor,
      anio: validado.anio,
      prestado: prestadoTemp,
    })
  );
}
function prestarLibro(idLibro: number): void {
  // Primero validamos que exista.
  const idValidado = idShema.parse(idLibro);

  const indice = libros.findIndex((libro) => libro.id === idValidado);
  if (indice === -1) throw new Error("No se encontró el libro");
  if (libros[indice].prestado === true)
    throw new Error("Ese libro ya está prestado."); // operaciones de lectura no se ven afectadas.
  /*
  Esto aqui es clave, clonamos para no alterar el array original.
  esto se hace para evitar un monton de errores, entre ellos, condiciones de carrera asincronas.
  Es un enfoque que me recuerda a las transacciones de SQL, ya que mantiene la coherencia de los datos.
  
  Todavia no lo tengo claro, pero chatGPT me dice que este patron es fundamental para trabajar a lo largo de todo ecosistema de JS.
  EJ: todo el ecosistema de React, sequelize, mongoose. 
  */
  const copia = [...libros]; // Aqui creamos una "copia" no me da para explicarlo todo aqui.
  copia[indice] = copia[indice].withChanges({ prestado: true }); // aqui clonamos y modificamos el objeto que deseamos. 

  libros = copia; // Aqui reasignamos la referencia del array clonado al array original.
}
function devolverLibro(idLibro: number): void {}
function buscarLibro(terminoBusqueda: string): void {}
function listarDisponibles(): void {}

agregarLibro({
  autor: "Mateo",
  anio: 2025,
  titulo: "The C# Programming Language",
});
agregarLibro({
  autor: "Nadir Bolivar",
  anio: 2025,
  titulo: "La biblia de trucos para conquistar a cualquier mujer",
});

// Puedes agregar un registro de préstamos si lo consideras necesario.
// let prestamos = [];
console.log(2);
