import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export default {
  async findClassroomJoins(request: Request, response: Response) {
    try {
      const id = Number(request.params.classroom)
      
      const prisma = new PrismaClient()

      const classroom = await prisma.classrooms.findFirst({ 
        where: { id: id },
        include: {
          joinRequests: {
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

      const join = classroom.joinRequests.map(joinRequest => {
        const { name, email, username } = joinRequest.student
        return { id: joinRequest.id, name, email, username }
      })

      return response.json(join)
    } catch (error) {
      return response.sendStatus(500)
    }
  },
  async create (request: Request, response: Response) {
    try {
      let { student, classroom } = request.params

      const prisma = new PrismaClient()
      
      const studentExists = await prisma.students.findFirst({ 
        where: { id: Number(student) }
      })
      if(!studentExists) return response.status(400).send('student not found')

      const classroomExists = await prisma.classrooms.findUnique({ where: { id: Number(classroom) }})

      if(!classroomExists) return response.status(400).send('classroom not found')

      const banishment = await prisma.bannedStudents.findFirst({ where: { studentId: studentExists.id, classroomId: classroomExists.id }})

      if(banishment) return response.status(400).send('esse estudante foi banido dessa turma')

      const invitationExists = await prisma.joinRequests.findFirst({ where: { studentId: studentExists.id, classroomId: classroomExists.id }})

      if(invitationExists) return response.status(400).send('Esse aluno já solicitou adesão para essa turma')

      const classroomStudentExists = await prisma.students_classrooms_classrooms.findFirst({ where: {
        studentsId: studentExists.id,
        classroomsId: classroomExists.id,
      }})

      if(classroomStudentExists) return response.status(400).send('Esse aluno já pertence a turma')
      
      await prisma.joinRequests.create({ data: {
        studentId: studentExists.id,
        classroomId: classroomExists.id,
      }})

      return response.status(200).json(true)
    } catch (error){
      response.status(500).send('internal server error')
    }
  },

  async accept (request: Request, response: Response) {

    try {
      
      const id = Number(request.params.id)

      const prisma = new PrismaClient()

      const joinRequestExists = await prisma.joinRequests.findUnique({ where: { id } })
      
      if(!joinRequestExists) 
        return response.status(400).send('joinRequest not found')

      const studentClassroomCreate = prisma.students_classrooms_classrooms.create({ 
        data: { 
          studentsId: joinRequestExists.studentId, 
          classroomsId: joinRequestExists.classroomId,
        }
      })

      const joinRequestDelete = prisma.joinRequests.delete({ where: { id }})


      await prisma.$transaction([ studentClassroomCreate, joinRequestDelete ])

      return response.status(200).json(true)

    } catch (error) {

      response.status(500).send('internal server error')
    }
  },

  async remove (request: Request, response: Response) {

    try {

      const id = Number(request.params.id)

      const prisma = new PrismaClient()
      
      const joinRequest = await prisma.joinRequests.findUnique({ where: { id } })
      
      if(!joinRequest) 
        return response.status(400).send('joinRequest not found')
      
      await prisma.joinRequests.delete({ where: { id }})

      return response.status(200).json(true)

    } catch (error) {

      response.status(500).send('internal server error')
    }
  }
}
