import * as z from "zod";

export const libroSchema = z.object({
  id: z.int().positive().default(0),
  titulo: z.string().max(100).default(''),
  autor: z.string().max(100).default(''),
  anio: z.int().positive().default(0),
  prestado: z.boolean().default(false),
});

export const idSchema = libroSchema.shape.id;
export const tituloSchema = libroSchema.shape.titulo;
export const autorSchema = libroSchema.shape.autor;
export const anioSchema = libroSchema.shape.anio;
export const prestadoSchema = libroSchema.shape.prestado;

export type LibroSchema = z.infer<typeof libroSchema>;

export class Libro {
  private _id!: number;
  private _titulo!: string;
  private _anio!: number;
  private _autor!: string;
  private _prestado!: boolean;

  constructor(data: Partial<LibroSchema> = {}) {
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
  get autor(): string {
    return this._autor;
  }
  get prestado(): boolean {
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
  set autor(value: string) {
    this._autor = autorSchema.parse(value);
  }
  set prestado(value: boolean) {
    this._prestado = prestadoSchema.parse(value);
  }
  withChanges(changes: Partial<LibroSchema>): Libro {
    return new Libro({ 
      ...this.toJSON(), 
      ...changes 
    });
  }

  toJSON(): LibroSchema {
    return {
      id: this._id,
      titulo: this._titulo,
      anio: this._anio,
      autor: this._autor,
      prestado: this._prestado
    };
  }
}
