import { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";

export default {
  async findClassroomBanishments(request: Request, response: Response) {
    try {
      const idClassroom = Number(request.params.idClassroom)
      
      const prisma = new PrismaClient()

      const classroom = await prisma.classrooms.findFirst({ 
        where: { id: idClassroom },
        include: {
          bannedStudents: {
            include: {
              student: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                }
              }
            }
          },
        }
      })

      if(!classroom) return response.status(400).send('classroom not found')

      const students = classroom.bannedStudents.map(bannedStudent => {
        const { id, name, email, username } = bannedStudent.student
        return { id, name, email, username }
      })

      return response.json(students)
    } catch (error) {
      return response.sendStatus(500)
    }
  },

  async create(request: Request, response: Response) {
    try {
      const idClassroom = Number(request.params.idClassroom)
      const idStudent = Number(request.params.idStudent)
      
      const prisma = new PrismaClient()

      const classroomExists = await prisma.classrooms.findFirst({ 
        where: { id: idClassroom }
      })

      if(!classroomExists) return response.status(400).send('classroom not found')
      
      const studentExists = await prisma.students.findFirst({ 
        where: { id: idStudent }
      })
      
      if(!studentExists) return response.status(400).send('student not found')

      const classroomStudentExists = await prisma.students_classrooms_classrooms.findFirst({ where: {
        studentsId: studentExists.id,
        classroomsId: idClassroom,
      }})

      if(!classroomStudentExists) return response.status(400).send('Esse aluno não pertence à turma')

      const bannedStudent = await prisma.bannedStudents.findFirst({ where: { classroomId: idClassroom, studentId: idStudent  } })

      if(bannedStudent) return response.status(400).send('Esse aluno já foi banido dessa turma')

      const studentClassroomDelete = prisma.students_classrooms_classrooms.delete({ where: { 
        studentsId_classroomsId: {
          classroomsId: idClassroom, 
          studentsId: idStudent
        }   
      }})

      const bannedStudentsCreate = prisma.bannedStudents.create({ data: { classroomId: idClassroom, studentId: idStudent }})

      await prisma.$transaction([ bannedStudentsCreate, studentClassroomDelete ])
      
      return response.sendStatus(200)
    } catch (error) {
      console.log(error)
      return response.sendStatus(500)
    }
  },

  async remove(request: Request, response: Response) {
    try {
      const idClassroom = Number(request.params.idClassroom)
      const idStudent = Number(request.params.idStudent)
      
      const prisma = new PrismaClient()

      const classroomExists = await prisma.classrooms.findFirst({ 
        where: { id: idClassroom }
      })

      if(!classroomExists) return response.status(400).send('classroom not found')
      
      const studentExists = await prisma.students.findFirst({ 
        where: { id: idStudent }
      })
      
      if(!studentExists) return response.status(400).send('student not found')

      const banishment = await prisma.bannedStudents.findFirst({ where: { classroomId: idClassroom, studentId: idStudent  } })

      if(!banishment) return response.status(400).send('banishment not found')

      await prisma.bannedStudents.delete({ where: { id: banishment.id }})

      return response.sendStatus(200)
    } catch (error) {
      return response.sendStatus(500)
    }
  }
}
