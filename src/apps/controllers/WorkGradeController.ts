import { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";

export default {
  async create(request: Request, response: Response) {
    const workId = Number(request.params.id)
    
    const client = new PrismaClient()
    await client.workGrades.deleteMany({ where: { workId }})
    for(const element of request.body){
      const data = {
        workId,
        studentId: element.id,
        grade: element.grade
      }

      await client.workGrades.create({ data })
    }
    return response.sendStatus(200)
  },

  async getworkGradeTemplate(request: Request, response: Response) {
    const id = Number(request.params.id)
   
    const client = new PrismaClient()
   
    const work = await client.works.findUnique({ where: { id } })
   
    if(!work) return response.sendStatus(400)

    const students = await client.students.findMany({ 
      where: { 
        students_classrooms_classrooms: { 
          some: { 
            classroomsId: work.classroomId 
          }
        }
      },
      select: {
        id: true,
        name: true,
        grades: { select: { grade: true }, where: { workId: work.id }}
      }
    })

    const template = students.map(student => ({
      id: student.id,
      name: student.name,
      grade: student.grades.shift()?.grade || null
    }))

    return response.json(template)
  }
}
