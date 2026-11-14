-- CreateTable
CREATE TABLE "NoteData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "subjcode" TEXT NOT NULL,
    "crsenumb" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "imageUrl" TEXT,
    "textContent" TEXT,

    CONSTRAINT "NoteData_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "NoteData_content_check" CHECK ("imageUrl" IS NOT NULL OR "textContent" IS NOT NULL)
);

-- CreateIndex
CREATE INDEX "NoteData_userId_idx" ON "NoteData"("userId");

-- CreateIndex
CREATE INDEX "NoteData_subjcode_crsenumb_semester_idx" ON "NoteData"("subjcode", "crsenumb", "semester");

-- AddForeignKey
ALTER TABLE "NoteData" ADD CONSTRAINT "NoteData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
