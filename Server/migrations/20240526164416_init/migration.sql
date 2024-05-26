/*
  Warnings:

  - Added the required column `projectId` to the `Embeddings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Embeddings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('creating', 'failed', 'created');

-- AlterTable
ALTER TABLE "Embeddings" ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'creating',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Embeddings" ADD CONSTRAINT "Embeddings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
