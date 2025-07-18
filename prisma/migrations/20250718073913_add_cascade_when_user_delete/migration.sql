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
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("coverArt", "createdAt", "mangaId", "title", "userId") SELECT "coverArt", "createdAt", "mangaId", "title", "userId" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
CREATE TABLE "new_ReadingHistory" (
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "coverArt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "chapterNumber" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    CONSTRAINT "ReadingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReadingHistory" ("chapterId", "chapterNumber", "coverArt", "createdAt", "mangaId", "title", "updatedAt", "userId") SELECT "chapterId", "chapterNumber", "coverArt", "createdAt", "mangaId", "title", "updatedAt", "userId" FROM "ReadingHistory";
DROP TABLE "ReadingHistory";
ALTER TABLE "new_ReadingHistory" RENAME TO "ReadingHistory";
CREATE UNIQUE INDEX "ReadingHistory_mangaId_key" ON "ReadingHistory"("mangaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
