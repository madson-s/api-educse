-- CreateTable
CREATE TABLE "workGrades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "grade" REAL NOT NULL,
    CONSTRAINT "workGrades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "workGrades_workId_fkey" FOREIGN KEY ("workId") REFERENCES "works" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
