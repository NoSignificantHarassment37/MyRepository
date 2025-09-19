import * as z from "zod";
import { Libro, libroSchema, idSchema, tituloSchema } from "./Libro.js";

/*
Explicacion rápida:
Aqui abajo defino el esquema global de zod, que contiene TODOS los esquemas de validacion de sus propiedades individuales.
Esto lo hago porque me da dos opciones si llego a necesitar validar una propiedad individual en otro archivo:
1. Si siento que voy a necesitar mucho el validar esa propiedad en todos los archivos y en muchos lados, simplemente importo esa propiedad individual.
2. Si siento que NO vo a necesitar mucho el validar esa propiedad en diferentes lados, la puedo extraer del esquema global donde la necesite.  
*/
export const librarySchema = z.object({
  libros: z.array(libroSchema).default([]),
  nombre: z.string().max(50).default(""),
  direccion: z.string().max(50).default(""),
});

export type LibrarySchema = z.infer<typeof librarySchema>;

export const librosSchema = librarySchema.shape.libros;
export const nombreSchema = librarySchema.shape.nombre;
export const direccionSchema = librarySchema.shape.direccion;

const CreateBookDTOSchema = z.object({
  autor: z.string().max(100).default(""),
  anio: z.number().int().positive().default(0),
  titulo: z.string().max(100).default(""),
});

export type CreateBookDTO = z.infer<typeof CreateBookDTOSchema>;

export class Library {
  private _nombre: string = "";
  private _direccion: string = "";
  private _libros: Array<Libro> = [];
  private keep_auto_increment: number = 1;
  private static readonly librarySchemaPartial = librarySchema
    .partial()
    .default({});
  constructor(data: Partial<LibrarySchema> = {}) {
    const dataValidated = Library.librarySchemaPartial.parse(data);

    this._nombre = dataValidated.nombre ?? "";
    this._direccion = dataValidated.direccion ?? "";
    this._libros = (dataValidated.libros ?? []).map((l) => new Libro(l));
    /*
        Esta ultima linea es importante, si no mapeamos los objetos que vienen del argumento a una 
        instancia de la clase 'Libro' el compilador se queja por error de tipos, ya que zod no devuelve una instancia de la clase.
    */
  }
  get nombre(): string {
    return this._nombre;
  }
  get direccion(): string {
    return this._direccion;
  }
  get libros(): Array<Libro> {
    return this._libros;
  }
  set nombre(value: string) {
    this._nombre = nombreSchema.parse(value);
  }
  set direccion(value: string) {
    this._direccion = direccionSchema.parse(value);
  }
  set libros(value: Array<Libro>) {
    const librosValidados = librosSchema.parse(value);
    this._libros = librosValidados.map((l) => new Libro(l));
  }
  agregarLibro(dto: CreateBookDTO): void {
    const validado: CreateBookDTO = CreateBookDTOSchema.parse(dto);
    const idTemp: number = this.keep_auto_increment++;
    const prestadoTemp: boolean = false;

    this._libros.push(
      new Libro({
        id: idTemp,
        titulo: validado.titulo,
        autor: validado.autor,
        anio: validado.anio,
        prestado: prestadoTemp,
      })
    );
  }
  devolverLibro(idLibro: number): void {
    const idLibroValidado = idSchema.parse(idLibro);

    const indice = this._libros.findIndex(
      (libro) => libro.id === idLibroValidado
    );
    if (indice === -1) throw new Error("No se encontró el libro.");
    if (this._libros[indice].prestado === false)
      throw new Error("Ese libro no está prestado.");

    const copia = [...this._libros];
    copia[indice] = copia[indice].withChanges({ prestado: false });
    this._libros = copia;
  }
  buscarLibro(terminoBusqueda: string): Array<Libro> {
    const terminoBusquedaValidado = tituloSchema.parse(terminoBusqueda);

    const filtrados = this._libros.filter((libro) =>
      libro.titulo.includes(terminoBusquedaValidado)
    );

    return filtrados;
  }
  listarDisponibles(): Array<Libro> {
    const filtrados = this._libros.filter((libro) => (libro.prestado === false));
    return filtrados;
  }
  prestarLibro(idLibro: number): void {
    const idValidado = idSchema.parse(idLibro);

    const indice = this._libros.findIndex((libro) => libro.id === idValidado);
    if (indice === -1) throw new Error("No se encontró el libro.");
    if (this._libros[indice].prestado === true)
      throw new Error("Ese libro ya está prestado."); // operaciones de lectura no se ven afectadas.
    /*
    Esto aqui es clave, clonamos para no alterar el array original.
    esto se hace para evitar un monton de errores, entre ellos, condiciones de carrera asincronas.
    Es un enfoque que me recuerda a las transacciones de SQL, ya que mantiene la coherencia de los datos.
    
    Todavia no lo tengo claro, pero chatGPT me dice que este patron es fundamental para trabajar a lo largo de todo ecosistema de JS.
    EJ: todo el ecosistema de React, sequelize, mongoose. 
    */
    const copia = [...this._libros]; // Aqui creamos una "copia" no me da para explicarlo todo aqui.
    copia[indice] = copia[indice].withChanges({ prestado: true }); // aqui clonamos y modificamos el objeto que deseamos.

    this._libros = copia; // Aqui reasignamos la referencia del array clonado al array original.
  }
}
