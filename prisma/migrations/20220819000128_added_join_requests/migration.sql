-- CreateTable
CREATE TABLE "joinRequests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    CONSTRAINT "joinRequests_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "joinRequests_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
