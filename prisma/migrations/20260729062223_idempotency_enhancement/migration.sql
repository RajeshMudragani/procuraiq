/*
  Warnings:

  - Added the required column `method` to the `idempotency_keys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `idempotency_keys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idempotency_keys" ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
