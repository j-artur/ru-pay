/*
  Warnings:

  - You are about to drop the column `universityId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `universityId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `universityId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `University` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_universityId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_universityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_universityId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "universityId";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "universityId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "universityId";

-- DropTable
DROP TABLE "University";
