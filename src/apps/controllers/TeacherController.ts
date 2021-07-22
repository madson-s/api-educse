import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Teacher from '../models/Teacher'

export default {
  
  async index (request: Request, response: Response) {
    const teacherRespository = getRepository(Teacher)
    const teachers = await teacherRespository.find()
    return response.json(teachers)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const teacherRespository = getRepository(Teacher) 
    const teacher = await teacherRespository.findOne({ where: { id }, relations: ['schools']}) 
    if(!teacher) {
      return response.sendStatus(404)
    }
    return response.json(teacher)
  },

  async create(request: Request, response: Response) {
    const { name, email, password, phone } = request.body
    const is_verified = false;
    const teacherRespository = getRepository(Teacher)
    const teacherExists = await teacherRespository.findOne({ where: { email }}) 
    if(teacherExists) {
      return response.sendStatus(409)
    }
    const teacher = teacherRespository.create({ name, email, password, phone, is_verified })
    await teacherRespository.save(teacher)
    return response.json(teacher)
  },

  async update(request: Request, response: Response) {
    const { name, email, password, phone } = request.body
    const { id } = request.params
    const teacherRespository = getRepository(Teacher) 
    const teacher = await teacherRespository.findOne({ where: { id }}) 
    if(!teacher) {
      return response.sendStatus(404)
    }
    teacher.name = name
    teacher.email = email
    teacher.password = password
    teacher.phone = phone
    await teacherRespository.save(teacher)
    return response.json(teacher)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const teacherRespository = getRepository(Teacher) 
    const teacher = await teacherRespository.findOne({ where: { id }})  
    if(!teacher) {
      return response.sendStatus(404)
    }
    await teacherRespository.remove(teacher)
    return response.sendStatus(200)
  },
}
