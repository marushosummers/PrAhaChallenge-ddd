/*
  Warnings:

  - You are about to drop the `ProgressStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MemberTask" DROP CONSTRAINT "MemberTask_progressStatusId_fkey";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "activityStatus" SET DEFAULT E'ONGOING';

-- AlterTable
ALTER TABLE "MemberTask" ALTER COLUMN "progressStatusId" SET DEFAULT E'InReview';

-- DropTable
DROP TABLE "ProgressStatus";
