/*
  Warnings:

  - You are about to drop the column `activityStatusId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the `ActivityStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_activityStatusId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "activityStatusId",
ADD COLUMN     "activityStatus" TEXT NOT NULL DEFAULT E'active';

-- DropTable
DROP TABLE "ActivityStatus";
