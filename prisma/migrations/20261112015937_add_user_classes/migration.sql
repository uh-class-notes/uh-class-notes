-- CreateTable
CREATE TABLE "UserClass" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "classDataId" INTEGER NOT NULL,

    CONSTRAINT "UserClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserClass_userId_classDataId_key" ON "UserClass"("userId", "classDataId");

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_classDataId_fkey" FOREIGN KEY ("classDataId") REFERENCES "ClassData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
