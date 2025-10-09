import type * as Z from 'zod';
export declare const ClienteSchema: Z.ZodObject<{
    nombre: Z.ZodString;
    direccion: Z.ZodString;
    telefono: Z.ZodString;
}, Z.z.core.$strip>;
export type Cliente = Z.infer<typeof ClienteSchema>;
//# sourceMappingURL=Clientes.schema.d.ts.map