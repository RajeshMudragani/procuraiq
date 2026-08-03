-- CreateTable
CREATE TABLE "signing_keys" (
    "id" TEXT NOT NULL,
    "kid" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "activatedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "signing_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signing_keys_kid_key" ON "signing_keys"("kid");

-- CreateIndex
CREATE INDEX "signing_keys_kid_idx" ON "signing_keys"("kid");

-- CreateIndex
CREATE INDEX "signing_keys_isActive_idx" ON "signing_keys"("isActive");
