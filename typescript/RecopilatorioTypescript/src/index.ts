// const estado = {
//     activo: "activo",
//     inactivo: "inactivo",
//     noDefinido: "noDefinido"
// } as const;
// class Persona {
//     private nombre: string;
//     constructor(nombre: string) {
//         this.nombre = nombre;
//     }
// }
// class Empleado extends Persona {
//     estado: Estado;
//     salario: number;
//     constructor(nombre: string, salario: number, estado: Estado) {
//         super(nombre);
//         this.salario = salario;
//         this.estado = estado;
//     }
// }
// type Estado = (typeof estado)[keyof typeof estado];
// function porcentajeDePorcentaje(p1: number, p2: number): number {
//     return (p1 / 100) * (p2 / 100) * 100;
// }
// console.log(porcentajeDePorcentaje(8, 2));
import { controlDeFlujo } from "./control-de-flujo.js";
controlDeFlujo();