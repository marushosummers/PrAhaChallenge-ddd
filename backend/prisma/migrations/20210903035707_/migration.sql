/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "pairId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member.email_unique" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Team.name_unique" ON "Team"("name");
