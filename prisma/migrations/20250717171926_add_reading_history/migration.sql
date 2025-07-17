-- CreateTable
CREATE TABLE "ReadingHistory" (
    "userId" TEXT NOT NULL,
    "mangaId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "coverArt" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReadingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingHistory_mangaId_key" ON "ReadingHistory"("mangaId");
