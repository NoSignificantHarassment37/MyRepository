/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_permisos_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `actividad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `disponibilidad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `disponibilidad_paquete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itinerario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paquete_servicio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paquete_turistico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permiso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proveedor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reseña` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_paquete_id_fkey";

-- DropForeignKey
ALTER TABLE "_permisos_roles" DROP CONSTRAINT "_permisos_roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_permisos_roles" DROP CONSTRAINT "_permisos_roles_B_fkey";

-- DropForeignKey
ALTER TABLE "actividad" DROP CONSTRAINT "actividad_itinerario_id_fkey";

-- DropForeignKey
ALTER TABLE "disponibilidad" DROP CONSTRAINT "disponibilidad_servicioId_fkey";

-- DropForeignKey
ALTER TABLE "disponibilidad_paquete" DROP CONSTRAINT "disponibilidad_paquete_disponibilidad_id_fkey";

-- DropForeignKey
ALTER TABLE "disponibilidad_paquete" DROP CONSTRAINT "disponibilidad_paquete_paquete_id_fkey";

-- DropForeignKey
ALTER TABLE "itinerario" DROP CONSTRAINT "itinerario_paquete_id_fkey";

-- DropForeignKey
ALTER TABLE "paquete_servicio" DROP CONSTRAINT "paquete_servicio_paquete_id_fkey";

-- DropForeignKey
ALTER TABLE "paquete_servicio" DROP CONSTRAINT "paquete_servicio_servicio_id_fkey";

-- DropForeignKey
ALTER TABLE "permiso" DROP CONSTRAINT "permiso_usuario_creador_id_fkey";

-- DropForeignKey
ALTER TABLE "reserva" DROP CONSTRAINT "reserva_paquete_id_fkey";

-- DropForeignKey
ALTER TABLE "reserva" DROP CONSTRAINT "reserva_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "reseña" DROP CONSTRAINT "reseña_paquete_id_fkey";

-- DropForeignKey
ALTER TABLE "reseña" DROP CONSTRAINT "reseña_reserva_id_fkey";

-- DropForeignKey
ALTER TABLE "reseña" DROP CONSTRAINT "reseña_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "rol" DROP CONSTRAINT "rol_usuario_creador_id_fkey";

-- DropForeignKey
ALTER TABLE "servicio" DROP CONSTRAINT "servicio_proveedor_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_rol_id_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "_permisos_roles";

-- DropTable
DROP TABLE "actividad";

-- DropTable
DROP TABLE "disponibilidad";

-- DropTable
DROP TABLE "disponibilidad_paquete";

-- DropTable
DROP TABLE "itinerario";

-- DropTable
DROP TABLE "paquete_servicio";

-- DropTable
DROP TABLE "paquete_turistico";

-- DropTable
DROP TABLE "permiso";

-- DropTable
DROP TABLE "proveedor";

-- DropTable
DROP TABLE "reserva";

-- DropTable
DROP TABLE "reseña";

-- DropTable
DROP TABLE "rol";

-- DropTable
DROP TABLE "servicio";

-- DropTable
DROP TABLE "usuario";

-- DropEnum
DROP TYPE "Estado";

-- DropEnum
DROP TYPE "EstadoDisponibilidad";

-- CreateTable
CREATE TABLE "persona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("id")
);
