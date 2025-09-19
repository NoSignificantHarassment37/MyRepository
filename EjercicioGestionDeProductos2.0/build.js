import { build } from "esbuild";
import path from "path";

build({
  entryPoints: ["src/index.ts"], // punto de entrada de la app
  bundle: true,                   // mete todo en un solo archivo (o en varios si hay splitting)
  platform: "node",                // target = Node.js, no navegador
  target: "node20",                // versión mínima de Node que soportas
  outdir: "dist",                  // carpeta de salida
  sourcemap: true,                 // genera mapas de depuración
  tsconfig: "tsconfig.json",       // respeta tu configuración TS
  alias: {                         // alias para imports
    "@models": path.resolve("src/models"),
    "@abstract":path.resolve("src/abstract")
  }
}).catch(() => process.exit(1));
