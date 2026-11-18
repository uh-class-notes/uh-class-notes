CREATE TABLE "Term" (
  "id" SERIAL PRIMARY KEY,
  "code" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "semester" TEXT NOT NULL
);

CREATE TABLE "Course" (
  "id" SERIAL PRIMARY KEY,
  "subjcode" TEXT NOT NULL,
  "crsenumb" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "subjectName" TEXT NOT NULL
);

CREATE TABLE "Offering" (
  "id" SERIAL PRIMARY KEY,
  "termId" INTEGER NOT NULL,
  "courseId" INTEGER NOT NULL,
  "campcode" TEXT NOT NULL,
  "crn" TEXT NOT NULL,
  "seqnumb" TEXT NOT NULL,
  "lastName" TEXT
);

CREATE UNIQUE INDEX "Term_code_key" ON "Term"("code");
CREATE UNIQUE INDEX "Course_subjcode_crsenumb_key" ON "Course"("subjcode", "crsenumb");
CREATE INDEX "Course_subjcode_crsenumb_idx" ON "Course"("subjcode", "crsenumb");
CREATE UNIQUE INDEX "Offering_termId_campcode_crn_key"
  ON "Offering"("termId", "campcode", "crn");
CREATE INDEX "Offering_termId_courseId_idx" ON "Offering"("termId", "courseId");

ALTER TABLE "Offering"
  ADD CONSTRAINT "Offering_termId_fkey"
  FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Offering"
  ADD CONSTRAINT "Offering_courseId_fkey"
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "Term" ("code", "year", "semester")
VALUES ('202710', 2027, '10')
ON CONFLICT ("code") DO NOTHING;

INSERT INTO "Course" ("subjcode", "crsenumb", "name", "subjectName")
SELECT DISTINCT "subjcode", "crsenumb", '', "subjectName"
FROM "ClassData";

INSERT INTO "Offering" ("termId", "courseId", "campcode", "crn", "seqnumb", "lastName")
SELECT
  term."id",
  course."id",
  class."campcode",
  class."crn",
  class."seqnumb",
  class."lastName"
FROM "ClassData" AS class
JOIN "Term" AS term ON term."code" = '202710'
JOIN "Course" AS course
  ON course."subjcode" = class."subjcode"
 AND course."crsenumb" = class."crsenumb";

ALTER TABLE "SavedClass" ADD COLUMN "offeringId" INTEGER;

UPDATE "SavedClass" AS saved
SET "offeringId" = offering."id"
FROM "Offering" AS offering
JOIN "Course" AS course ON course."id" = offering."courseId"
JOIN "ClassData" AS class
  ON class."crn" = offering."crn"
WHERE saved."classDataId" = class."id";

DELETE FROM "SavedClass" WHERE "offeringId" IS NULL;

ALTER TABLE "SavedClass" ALTER COLUMN "offeringId" SET NOT NULL;

ALTER TABLE "SavedClass" DROP CONSTRAINT "SavedClass_classDataId_fkey";
DROP INDEX "SavedClass_userId_classDataId_key";
ALTER TABLE "SavedClass" DROP COLUMN "classDataId";

CREATE UNIQUE INDEX "SavedClass_userId_offeringId_key"
  ON "SavedClass"("userId", "offeringId");
ALTER TABLE "SavedClass"
  ADD CONSTRAINT "SavedClass_offeringId_fkey"
  FOREIGN KEY ("offeringId") REFERENCES "Offering"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

DROP TABLE "ClassData";
