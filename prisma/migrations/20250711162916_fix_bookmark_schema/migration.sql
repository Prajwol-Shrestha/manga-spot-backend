/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Bookmark` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bookmark" (
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverArt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "mangaId"),
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("coverArt", "createdAt", "mangaId", "title", "userId") SELECT "coverArt", "createdAt", "mangaId", "title", "userId" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
