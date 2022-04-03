import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export default {
  async create (request: Request, response: Response) {
    try {
      const { student, teacher, classroom } = request.body

      const prisma = new PrismaClient()
      
      const studentExists = await prisma.students.findFirst({ 
        where: { OR: [ { email: student }, { username: student } ]}
      })
      if(!studentExists) return response.status(400).send('student not found')

      const teacherExists = await prisma.teachers.findUnique({ where: { id: teacher }})
      if(!teacherExists) return response.status(400).send('teacher not found')

      const classroomExists = await prisma.classrooms.findUnique({ where: { id: classroom }})
      if(!classroomExists) return response.status(400).send('classroom not found')
      
      const invitation = await prisma.invitations.create({ data: {
        studentId: studentExists.id,
        teacherId: teacher,
        classroomId: classroom,
        answered: false,
        accepted: false,
      }})

      return response.status(201).send(invitation)
    } catch (error){
      response.status(500).send('internal server error')
    }
  },

  async accept (request: Request, response: Response) {

    try {
      
      const id = Number(request.params.id)

      const prisma = new PrismaClient()

      const invitationExists = await prisma.invitations.findUnique({ where: { id } })
      
      if(!invitationExists) 
        return response.status(400).send('invitation not found')

      const studentClassroomCreate = prisma.students_classrooms_classrooms.create({ 
        data: { 
          studentsId: invitationExists.studentId, 
          classroomsId: invitationExists.classroomId,
        }
      })

      const invitationDelete = prisma.invitations.delete({ where: { id }})

      await prisma.$transaction([ studentClassroomCreate, invitationDelete ])

      return response.sendStatus(200)

    } catch (error) {

      response.status(500).send('internal server error')
    }
  },

  async remove (request: Request, response: Response) {

    try {

      const id = Number(request.params.id)

      const prisma = new PrismaClient()
      
      const invitation = await prisma.invitations.findUnique({ where: { id } })
      
      if(!invitation) 
        return response.status(400).send('invitation not found')
      
      await prisma.invitations.delete({ where: { id }})

      return response.sendStatus(200)

    } catch (error) {

      response.status(500).send('internal server error')
    }
  }
}