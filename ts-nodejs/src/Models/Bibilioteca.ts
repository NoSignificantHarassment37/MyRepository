import * as z from "zod";
import { Libro, libroSchema } from "./Libro.js";

const librarySchema = z.object({
    libros: z.array(libroSchema),
    nombre: z.string().max(50),
    direccion: z.string().max(50) 
});

type LibrarySchema = z.infer<typeof librarySchema>;

const librosSchema = librarySchema.shape.libros;
const nombreSchema = librarySchema.shape.nombre;
const direccionSchema = librarySchema.shape.direccion;

export class Library {
    private _nombre!:string;
    private _direccion!:string;
    private _libros!:Array<Libro>;
    constructor(data: Partial<LibrarySchema>) {
        const dataValidated = librarySchema.parse(data);

        this._nombre = dataValidated.nombre;
        this._direccion = dataValidated.direccion;
        this._libros = dataValidated.libros;
    }
    get nombre():string{
        return this._nombre;
    }
    get direccion():string{
        return this._direccion;
    }
    get libros():Array<Libro>{
        return this.libros;
    }
    set nombre(value:string){

    }
}