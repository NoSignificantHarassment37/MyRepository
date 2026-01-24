🧾 PNPM CHEAT SHEET (para humanos)
🚀 Básico
pnpm -v
pnpm help

📦 Crear proyecto
pnpm init
pnpm init -y

➕ Instalar dependencias
pnpm add lodash
pnpm add express
pnpm add @nestjs/core

Dependencias de desarrollo
pnpm add -D typescript nodemon

Dependencias globales
pnpm add -g pnpm
pnpm add -g nodemon

📥 Instalar desde package.json
pnpm install
pnpm i

▶️ Ejecutar scripts
pnpm run start
pnpm run build
pnpm run test


Atajo:

pnpm start
pnpm test

🧹 Limpiar / reparar
pnpm store path
pnpm store prune
pnpm store status


store prune limpia paquetes no usados del cache global

🔁 Actualizar dependencias
pnpm update
pnpm update lodash
pnpm update --latest

🔍 Inspección y debug
pnpm list
pnpm list --depth 0
pnpm why lodash
pnpm outdated

🔒 Lockfile
pnpm-lock.yaml


determinista

amigable con git

menos conflictos

🧪 Migrar desde npm
pnpm import
rm -rf node_modules package-lock.json
pnpm install

🏗️ Workspaces / Monorepo
# pnpm-workspace.yaml
packages:
  - packages/*
  - apps/*


Comandos útiles:

pnpm -r install
pnpm -r run build

🧯 Compatibilidad legacy
pnpm install --shamefully-hoist


(aka “finjamos que somos npm”)

⚡ Flags útiles
--filter
--prod
--offline
--frozen-lockfile


Ejemplos:

pnpm install --frozen-lockfile
pnpm --filter api add express

🧠 Reglas mentales rápidas

pnpm add ≈ npm install

pnpm es estricto a propósito

si algo falla → dependencia mal declarada

pnpm ahorra disco como ninja 🥷

🎯 Cuándo usarlo sin pensar

múltiples proyectos

NestJS / Express

monorepos

CI/CD

cuando tu SSD ya no perdona