import { context } from "esbuild";
import glob from "tiny-glob";

const entryPoints = await glob("src/**/*.ts");

const ctxt = await context({
  entryPoints,
  bundle: true,
  outdir: "wwwroot/scripts",
  outbase: "src",
  format: "esm",
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  logLevel: "info"
});

// 👇 el “watch” se activa *fuera* de la configuración
await ctxt.watch();

console.log("👀 Modo watch activo. Esperando cambios...");
