/*
  Warnings:

  - Changed the type of `status` on the `rfqs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RfqStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'AWARDED', 'CANCELLED');

-- AlterTable
ALTER TABLE "rfq_items" ADD COLUMN     "itemCode" TEXT;

-- AlterTable
ALTER TABLE "rfqs" DROP COLUMN "status",
ADD COLUMN     "status" "RfqStatus" NOT NULL;

-- CreateIndex
CREATE INDEX "rfqs_status_idx" ON "rfqs"("status");
