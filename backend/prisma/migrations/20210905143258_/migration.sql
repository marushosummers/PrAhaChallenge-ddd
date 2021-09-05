/*
  Warnings:

  - The `activityStatus` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('ONGOING', 'RECESS', 'LEFT');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "activityStatus",
ADD COLUMN     "activityStatus" "ActivityStatus" NOT NULL DEFAULT E'ONGOING';
