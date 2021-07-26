import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Classroom from '../models/Classroom'
import Student from '../models/Student'

export default {

  async create(request: Request, response: Response) {
    const { studentId, classroomId } = request.body
    
    const classroomRespository = getRepository(Classroom)
    const studentRespository = getRepository(Student)
    
    const classroom = await classroomRespository.findOne({ where: { id: classroomId }})
    const student = await studentRespository.findOne({ where: { id: studentId }, relations: ['classrooms']})
    
    if(!student || !classroom) {
      return response.sendStatus(400)
    }
    
     student.classrooms.push(classroom)
    
    await studentRespository.save(student)
    
    return response.sendStatus(200)
  },

  async remove(request: Request, response: Response) {
    
    const { studentId, classroomId } = request.body
    
    const classroomRespository = getRepository(Classroom)
    const studentRespository = getRepository(Student)
    
    const classroom = await classroomRespository.findOne({ where: { id: classroomId }})
    const student = await studentRespository.findOne({ where: { id: studentId }, relations: ['classrooms']})
    
    if(!student || !classroom){
      return response.sendStatus(400)
    }

    student.classrooms.filter(classroom => classroom.id !== classroomId)
    
    await studentRespository.save(student)

    return response.sendStatus(200)
  },
}
