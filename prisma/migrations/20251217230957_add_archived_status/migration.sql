/*
  Warnings:

  - The values [CLOSED] on the enum `ContactRequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactRequestStatus_new" AS ENUM ('NEW', 'CONTACTED', 'ARCHIVED');
ALTER TABLE "public"."ContactRequest" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ContactRequest" ALTER COLUMN "status" TYPE "ContactRequestStatus_new" USING ("status"::text::"ContactRequestStatus_new");
ALTER TYPE "ContactRequestStatus" RENAME TO "ContactRequestStatus_old";
ALTER TYPE "ContactRequestStatus_new" RENAME TO "ContactRequestStatus";
DROP TYPE "public"."ContactRequestStatus_old";
ALTER TABLE "ContactRequest" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;
