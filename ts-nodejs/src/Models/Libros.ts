import * as z from "zod";

const idSchema = z.int().positive();
const tituloSchema = z.string().max(100);
const autorSchema = z.string().max(100);
const anioSchema = z.int().positive();
const prestadoSchema = z.boolean();

const libroSchema = z.object({
    id: idSchema,
    titulo: tituloSchema,
    autor: autorSchema,
    anio: anioSchema,
    prestado: prestadoSchema
});

type LibroSchema = z.infer<typeof libroSchema>;

export class Libro {
    private _id!: number;
    private _titulo!: string;
    private _anio!: number;
    private _autor!: string;
    private _prestado!: boolean;

    constructor(data: LibroSchema) {
        const parsed = libroSchema.parse(data);

        this.id = parsed.id;
        this.titulo = parsed.titulo;
        this.anio = parsed.anio;
        this.autor = parsed.autor;
        this.prestado = parsed.prestado;
    }
    get id(): number {
        return this._id;
    }
    get titulo(): string {
        return this._titulo;
    }
    get anio(): number {
        return this._anio;
    }
    get autor():string{
        return this._autor;
    }
    get prestado():boolean{
        return this._prestado;
    }
    set id(value: number) {
        this._id = idSchema.parse(value);
    }
    set titulo(value: string) {
        this._titulo = tituloSchema.parse(value);
    }
    set anio(value: number) {
        this._anio = anioSchema.parse(value);
    }
    set autor(value:string){
        this._autor = autorSchema.parse(value);
    }
    set prestado(value:boolean){
        this._prestado = prestadoSchema.parse(value);
    }
}