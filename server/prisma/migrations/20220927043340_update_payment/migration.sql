/*
  Warnings:

  - You are about to drop the column `receipt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `redeemed` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `date` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptUrl` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Paid', 'Redeemed', 'Rejected');

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "receipt",
DROP COLUMN "redeemed",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "receiptUrl" TEXT NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'Pending';
