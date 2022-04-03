import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export default {
  async create (request: Request, response: Response) {
    try {
      const { stundent, teacher, classroom } = request.body

      const prisma = new PrismaClient()
      
      const studentExists = await prisma.students.findUnique({ where: { id: stundent }})
      if(!studentExists) return response.status(400).send('student not found')

      const teacherExists = await prisma.teachers.findUnique({ where: { id: teacher }})
      if(!teacherExists) return response.status(400).send('teacher not found')

      const classroomExists = await prisma.classrooms.findUnique({ where: { id: classroom }})
      if(!classroomExists) return response.status(400).send('classroom not found')
      
      const invitation = await prisma.invitations.create({ data: {
        studentId: stundent,
        teacherId: teacher,
        classroomId: classroom,
        answered: false,
        accepted: false,
      }})

      return response.status(201).send(invitation)
    } catch {
      response.status(500).send('internal server error')
    }
  },

  
}