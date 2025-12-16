/*
  Warnings:

  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ContactRequest" ADD COLUMN     "product" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- DropTable
DROP TABLE "public"."Lead";
