-- Remove the unused legacy class records and their saved links.
DROP TABLE "UserClass";
DROP TABLE "ClassData";

-- Rename the active offering table and its saved-class relationship.
ALTER TABLE "ClassOffering" RENAME TO "ClassData";
ALTER TABLE "SavedClass" RENAME COLUMN "classOfferingId" TO "classDataId";

ALTER INDEX "ClassOffering_crn_key" RENAME TO "ClassData_crn_key";
ALTER INDEX "ClassOffering_campcode_subjcode_crsenumb_idx" RENAME TO "ClassData_campcode_subjcode_crsenumb_idx";
ALTER INDEX "SavedClass_userId_classOfferingId_key" RENAME TO "SavedClass_userId_classDataId_key";

ALTER TABLE "SavedClass"
  RENAME CONSTRAINT "SavedClass_classOfferingId_fkey" TO "SavedClass_classDataId_fkey";
