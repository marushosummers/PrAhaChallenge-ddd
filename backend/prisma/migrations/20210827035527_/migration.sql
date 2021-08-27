/*
  Warnings:

  - You are about to drop the column `progressStatusId` on the `MemberTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MemberTask" DROP COLUMN "progressStatusId",
ADD COLUMN     "progressStatus" TEXT NOT NULL DEFAULT E'InReview';
