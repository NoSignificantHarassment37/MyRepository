-- CreateTable
CREATE TABLE "persona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,

    CONSTRAINT "persona_pkey" PRIMARY KEY ("id")
);
