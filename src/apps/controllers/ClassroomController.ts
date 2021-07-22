import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Classroom from '../models/Classroom'

export default {
  
  async index (request: Request, response: Response) {
    const classroomRespository = getRepository(Classroom)
    const classrooms = await classroomRespository.find()
    return response.json(classrooms)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const classroomRespository = getRepository(Classroom) 
    const classroom = await classroomRespository.findOne({ where: { id }, relations: ['students','documents']}) 
    if(!classroom) {
      return response.sendStatus(404)
    }
    return response.json(classroom)
  },

  async create(request: Request, response: Response) {
    const { name, teacher } = request.body
    const classroomRespository = getRepository(Classroom)
    const classroom = classroomRespository.create({ name, teacher })
    await classroomRespository.save(classroom)
    return response.json(classroom)
  },

  async update(request: Request, response: Response) {
    const { name } = request.body
    const { id } = request.params
    const classroomRespository = getRepository(Classroom) 
    const classroom = await classroomRespository.findOne({ where: { id }}) 
    if(!classroom) {
      return response.sendStatus(404)
    }
    classroom.name = name
    await classroomRespository.save(classroom)
    return response.json(classroom)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const classroomRespository = getRepository(Classroom) 
    const classroom = await classroomRespository.findOne({ where: { id }})  
    if(!classroom) {
      return response.sendStatus(404)
    }
    await classroomRespository.remove(classroom)
    return response.sendStatus(200)
  },
}
