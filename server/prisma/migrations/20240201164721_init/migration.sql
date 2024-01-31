-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appId" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "rating" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "userName" TEXT NOT NULL
);
