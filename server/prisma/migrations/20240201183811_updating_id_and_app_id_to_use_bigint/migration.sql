/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `appId` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `id` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "appId" BIGINT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "rating" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "userName" TEXT NOT NULL
);
INSERT INTO "new_Review" ("appId", "content", "id", "rating", "title", "updatedAt", "userName") SELECT "appId", "content", "id", "rating", "title", "updatedAt", "userName" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
