/*
  Warnings:

  - Changed the type of `bank_account_number` on the `Bank_Accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Bank_Accounts" DROP COLUMN "bank_account_number",
ADD COLUMN     "bank_account_number" INTEGER NOT NULL;
