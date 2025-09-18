import * as z from "zod";

export const estado = {
    pendiente: "pendiente",
    enviado:"enviado",
    entregado:"entregado"
} as const;

export type Estado = z.infer<typeof estado>;