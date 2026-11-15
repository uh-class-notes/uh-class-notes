-- Add binary image storage for note uploads.
ALTER TABLE "NoteData" ADD COLUMN "imageData" BYTEA;

-- Require at least one note content source.
ALTER TABLE "NoteData" DROP CONSTRAINT "NoteData_content_check";
ALTER TABLE "NoteData"
  ADD CONSTRAINT "NoteData_content_check"
  CHECK ("imageData" IS NOT NULL OR "imageUrl" IS NOT NULL OR "textContent" IS NOT NULL);
