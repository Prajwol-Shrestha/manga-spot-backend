-- CreateTable
CREATE TABLE "PasswordresetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordresetToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PasswordresetToken" ADD CONSTRAINT "PasswordresetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
