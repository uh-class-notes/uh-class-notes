-- AlterTable
ALTER TABLE "NoteData" ADD COLUMN "section" TEXT;

-- AlterTable
ALTER TABLE "NoteData" ALTER COLUMN "instructor" DROP NOT NULL;

-- DropIndex
DROP INDEX "NoteData_subjcode_crsenumb_semester_idx";

-- CreateIndex
CREATE INDEX "NoteData_semester_subjcode_crsenumb_idx" ON "NoteData"("semester", "subjcode", "crsenumb");
