import { build } from "esbuild";

await build({
  entryPoints: ["src/pages/Clientes.ts"],
  bundle: true,
  outfile: "wwwroot/scripts/Clientes.js",
  format: "esm",
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  logLevel: "info"
});
