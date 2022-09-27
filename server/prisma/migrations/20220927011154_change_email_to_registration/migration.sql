/*
  Warnings:

  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - Added the required column `registration` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "profilePicture",
ADD COLUMN     "registration" TEXT NOT NULL;
