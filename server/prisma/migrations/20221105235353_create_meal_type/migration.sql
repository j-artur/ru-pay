/*
  Warnings:

  - You are about to drop the column `name` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `mealTypeId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealTypeId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_mealId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "mealTypeId" INTEGER NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "mealId",
ADD COLUMN     "mealTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MealType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "MealType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "MealType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
