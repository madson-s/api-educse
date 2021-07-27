import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import School from '../models/School'
import Teacher from '../models/Teacher'

export default {

  async create(request: Request, response: Response) {
    const { schoolId, teacherId } = request.body
    const schoolRespository = getRepository(School)
    const teacherRespository = getRepository(Teacher)
    const school = await schoolRespository.findOne({ where: { id: schoolId }}) 
    const teacher = await teacherRespository.findOne({ where: { id: teacherId }, relations: ['schools']}) 
    if(!teacher || !school) {
      return response.status(400)
    }
    teacher.schools.push(school)
    await teacherRespository.save(teacher)
    return response.json(school)
  },

  async remove(request: Request, response: Response) {
    const { schoolId, teacherId } = request.body
    const schoolRespository = getRepository(School)
    const teacherRespository = getRepository(Teacher)
    const school = await schoolRespository.findOne({ where: { id: schoolId }}) 
    const teacher = await teacherRespository.findOne({ where: { id: teacherId }, relations: ['schools']}) 
    if(!teacher || !school) {
      return response.status(400)
    }
    teacher.schools.filter(school => school.id != schoolId)
    await teacherRespository.save(teacher)
    return response.json(school)
  }
}
