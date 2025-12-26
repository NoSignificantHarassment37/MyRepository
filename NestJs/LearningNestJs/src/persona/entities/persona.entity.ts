import { personaModel } from 'src/generated/prisma/models.js';
export class Persona implements personaModel {
  id: number;
  nombre: string;
  edad: number;
}
