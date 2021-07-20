import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Classroom from '../models/Classroom'
import Student from '../models/Student'

export default {

  async store(request: Request, response: Response) {
    const { id } = request.params
    const { studentId } = request.body
    const classroomRespository = getRepository(Classroom)
    const studentRespository = getRepository(Student)
    let classroom = await classroomRespository.findOne({ where: { id }})
    const student = await studentRespository.findOne({ where: { id: studentId }, relations: ['classrooms']})
    if(!student || !classroom)
      return response.sendStatus(404)
    student.classrooms.push(classroom)
    await studentRespository.save(student)
    return response.sendStatus(200)
  },
}
