/*
  Warnings:

  - Changed the type of `identity_number` on the `Profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "identity_number",
ADD COLUMN     "identity_number" INTEGER NOT NULL;
