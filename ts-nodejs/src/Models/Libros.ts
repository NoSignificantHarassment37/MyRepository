import * as z from "zod";

const idSchema = z.int().positive();
const tituloSchema = z.string().max(100);
const anioSchema = z.int().positive();

const libroSchema = z.object({
    id: idSchema,
    titulo: tituloSchema,
    anio: anioSchema
});

type LibroSchema = z.infer<typeof libroSchema>;

export class Libro {
    private _id!: number;
    private _titulo!: string;
    private _anio!: number;
    constructor(data: LibroSchema) {
        const parsed = libroSchema.parse(data);

        this.id = parsed.id;
        this.titulo = parsed.titulo;
        this.anio = parsed.anio;
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
    set id(value: number) {
        this._id = idSchema.parse(value);
    }
    set titulo(value: string) {
        this._titulo = tituloSchema.parse(value);
    }
    set anio(value: number) {
        this._anio = anioSchema.parse(value);
    }
}