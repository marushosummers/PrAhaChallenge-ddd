/*
  Warnings:

  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MemberTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pair` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProgressStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_pairId_fkey";

-- DropForeignKey
ALTER TABLE "MemberTask" DROP CONSTRAINT "MemberTask_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MemberTask" DROP CONSTRAINT "MemberTask_progressStatusId_fkey";

-- DropForeignKey
ALTER TABLE "MemberTask" DROP CONSTRAINT "MemberTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_teamId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "pairId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Member_id_seq";

-- AlterTable
ALTER TABLE "MemberTask" DROP CONSTRAINT "MemberTask_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memberId" SET DATA TYPE TEXT,
ALTER COLUMN "taskId" SET DATA TYPE TEXT,
ALTER COLUMN "progressStatusId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "MemberTask_id_seq";

-- AlterTable
ALTER TABLE "Pair" DROP CONSTRAINT "Pair_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Pair_id_seq";

-- AlterTable
ALTER TABLE "ProgressStatus" DROP CONSTRAINT "ProgressStatus_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "ProgressStatus_id_seq";

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AddForeignKey
ALTER TABLE "Pair" ADD FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD FOREIGN KEY ("pairId") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberTask" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberTask" ADD FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberTask" ADD FOREIGN KEY ("progressStatusId") REFERENCES "ProgressStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
