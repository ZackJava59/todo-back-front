/*
  Warnings:

  - You are about to drop the `Todos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE IF EXISTS "Todos";

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
