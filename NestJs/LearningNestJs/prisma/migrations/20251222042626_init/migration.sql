/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('activo', 'inactivo');

-- CreateEnum
CREATE TYPE "EstadoDisponibilidad" AS ENUM ('bloqueada', 'no_disponible', 'disponible');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol_id" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'activo',
    "descripcion" TEXT NOT NULL,
    "usuario_creador_id" INTEGER,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permiso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Estado" NOT NULL DEFAULT 'activo',
    "descripcion" TEXT NOT NULL,
    "usuario_creador_id" INTEGER,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paquete_turistico" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio_total" DECIMAL(10,2) NOT NULL,
    "duracion_dias" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoDisponibilidad",
    "cantidad_personas" INTEGER NOT NULL,

    CONSTRAINT "paquete_turistico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disponibilidad_paquete" (
    "paquete_id" INTEGER NOT NULL,
    "disponibilidad_id" INTEGER NOT NULL,

    CONSTRAINT "disponibilidad_paquete_pkey" PRIMARY KEY ("paquete_id","disponibilidad_id")
);

-- CreateTable
CREATE TABLE "itinerario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "dia" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "paquete_id" INTEGER,

    CONSTRAINT "itinerario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "hora_inicio" TIMESTAMP(3),
    "hora_fin" TIMESTAMP(3),
    "itinerario_id" INTEGER,
    "ubicacion" TEXT NOT NULL DEFAULT 'No especificada.',

    CONSTRAINT "actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL,
    "proveedor_id" INTEGER,

    CONSTRAINT "servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disponibilidad" (
    "id" SERIAL NOT NULL,
    "estado" "EstadoDisponibilidad" NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "servicioId" INTEGER NOT NULL,
    "cupo" INTEGER NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "detalles" TEXT NOT NULL,

    CONSTRAINT "disponibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paquete_servicio" (
    "paquete_id" INTEGER NOT NULL,
    "servicio_id" INTEGER NOT NULL,

    CONSTRAINT "paquete_servicio_pkey" PRIMARY KEY ("paquete_id","servicio_id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "paquete_id" INTEGER NOT NULL,
    "fecha_reserva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero_personas" INTEGER NOT NULL DEFAULT 1,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "reseña_id" INTEGER,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paquete_id" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reseña" (
    "id" SERIAL NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "detalles" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    "paquete_id" INTEGER NOT NULL,
    "reserva_id" INTEGER,

    CONSTRAINT "reseña_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_permisos_roles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_permisos_roles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "permiso_nombre_key" ON "permiso"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "paquete_turistico_nombre_key" ON "paquete_turistico"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "servicio_nombre_proveedor_id_key" ON "servicio"("nombre", "proveedor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_paquete_id_key" ON "Image"("paquete_id");

-- CreateIndex
CREATE UNIQUE INDEX "proveedor_nombre_key" ON "proveedor"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "proveedor_email_key" ON "proveedor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reseña_reserva_id_key" ON "reseña"("reserva_id");

-- CreateIndex
CREATE INDEX "_permisos_roles_B_index" ON "_permisos_roles"("B");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol" ADD CONSTRAINT "rol_usuario_creador_id_fkey" FOREIGN KEY ("usuario_creador_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permiso" ADD CONSTRAINT "permiso_usuario_creador_id_fkey" FOREIGN KEY ("usuario_creador_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidad_paquete" ADD CONSTRAINT "disponibilidad_paquete_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidad_paquete" ADD CONSTRAINT "disponibilidad_paquete_disponibilidad_id_fkey" FOREIGN KEY ("disponibilidad_id") REFERENCES "disponibilidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerario" ADD CONSTRAINT "itinerario_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividad" ADD CONSTRAINT "actividad_itinerario_id_fkey" FOREIGN KEY ("itinerario_id") REFERENCES "itinerario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disponibilidad" ADD CONSTRAINT "disponibilidad_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paquete_servicio" ADD CONSTRAINT "paquete_servicio_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paquete_servicio" ADD CONSTRAINT "paquete_servicio_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reseña" ADD CONSTRAINT "reseña_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reseña" ADD CONSTRAINT "reseña_paquete_id_fkey" FOREIGN KEY ("paquete_id") REFERENCES "paquete_turistico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reseña" ADD CONSTRAINT "reseña_reserva_id_fkey" FOREIGN KEY ("reserva_id") REFERENCES "reserva"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permisos_roles" ADD CONSTRAINT "_permisos_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "permiso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permisos_roles" ADD CONSTRAINT "_permisos_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;
