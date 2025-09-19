import { fileURLToPath } from "url"; // 🔹 OBLIGATORIO
import { build } from "esbuild";
import alias from "esbuild-plugin-alias";
import path from "path";

// Simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

build({
  bundle: true,
  external: ["express"], // de momento se que esto excluye express del bundle final.
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  outdir: "dist",
  sourcemap: true,
  tsconfig: "tsconfig.json",
  plugins: [
    alias({
      "@controllers": path.resolve(__dirname, "src/controllers"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@models": path.resolve(__dirname, "src/models"),
    }),
  ],
}).catch(() => process.exit(1));
