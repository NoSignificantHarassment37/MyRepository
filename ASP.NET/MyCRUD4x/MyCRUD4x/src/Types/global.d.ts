// src/types/global.d.ts
import type * as z from "zod";

declare global {
  interface Window {
    Zod: typeof z;
  }
}

export {}; // esto convierte el archivo en módulo y evita colisiones
