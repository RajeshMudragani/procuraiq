/*
  Warnings:

  - You are about to drop the column `tenantId` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_tenantId_fkey";

-- DropIndex
DROP INDEX "permissions_name_key";

-- DropIndex
DROP INDEX "roles_tenantId_idx";

-- DropIndex
DROP INDEX "roles_tenantId_name_key";

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "user_roles" ADD COLUMN     "assignedBy" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "permissions_code_idx" ON "permissions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
