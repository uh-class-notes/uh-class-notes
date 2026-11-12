-- CreateTable
CREATE TABLE "ClassData" (
    "id" SERIAL NOT NULL,
    "stvsubjDesc" TEXT NOT NULL,
    "ssbsectCampCode" TEXT NOT NULL,
    "stvsubjCode" TEXT NOT NULL,
    "stvtermDesc" TEXT NOT NULL,
    "stvtermCode" TEXT NOT NULL,
    "countStvtermCode" INTEGER NOT NULL,

    CONSTRAINT "ClassData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassData_stvsubjCode_ssbsectCampCode_stvtermCode_key" ON "ClassData"("stvsubjCode", "ssbsectCampCode", "stvtermCode");
