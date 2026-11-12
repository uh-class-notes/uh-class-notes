-- CreateTable
CREATE TABLE "ClassOffering" (
    "id" SERIAL NOT NULL,
    "campcode" TEXT NOT NULL,
    "crn" TEXT NOT NULL,
    "subjcode" TEXT NOT NULL,
    "crsenumb" TEXT NOT NULL,
    "seqnumb" TEXT NOT NULL,
    "lastName" TEXT,
    "subjectName" TEXT NOT NULL,

    CONSTRAINT "ClassOffering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedClass" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "classOfferingId" INTEGER NOT NULL,

    CONSTRAINT "SavedClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassOffering_crn_key" ON "ClassOffering"("crn");

-- CreateIndex
CREATE INDEX "ClassOffering_campcode_subjcode_crsenumb_idx" ON "ClassOffering"("campcode", "subjcode", "crsenumb");

-- CreateIndex
CREATE UNIQUE INDEX "SavedClass_userId_classOfferingId_key" ON "SavedClass"("userId", "classOfferingId");

-- AddForeignKey
ALTER TABLE "SavedClass" ADD CONSTRAINT "SavedClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedClass" ADD CONSTRAINT "SavedClass_classOfferingId_fkey" FOREIGN KEY ("classOfferingId") REFERENCES "ClassOffering"("id") ON DELETE CASCADE ON UPDATE CASCADE;
