-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bannedStudents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    CONSTRAINT "bannedStudents_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bannedStudents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bannedStudents" ("classroomId", "id", "studentId") SELECT "classroomId", "id", "studentId" FROM "bannedStudents";
DROP TABLE "bannedStudents";
ALTER TABLE "new_bannedStudents" RENAME TO "bannedStudents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
