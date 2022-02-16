import { managers, schools, students, teachers } from "./seeds";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {

    for (const manager of managers) {
        await prisma.managers.create({
            data: manager
        })
    }
    for (const school of schools) {
        await prisma.schools.create({
            data: school
        })
    }
    for (const student of students) {
        await prisma.students.create({
            data: student
        })
    }
    for (const teacher of teachers) {
        await prisma.teachers.create({
            data: teacher
        })
    }
}

main().catch(error => { 
    console.log(error);
    process.exit(1);
}).finally(() => prisma.$disconnect());