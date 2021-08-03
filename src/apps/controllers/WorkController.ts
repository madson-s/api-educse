import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Work from '../models/Work'
import Classroom from '../models/Classroom'

export default {
  
  async index (request: Request, response: Response) {
    const workRespository = getRepository(Work)
    const works = await workRespository.find()
    return response.json(works)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const workRespository = getRepository(Work) 
    const work = await workRespository.findOne({ where: { id }}) 
    if(!work) {
      return response.sendStatus(404)
    }
    return response.json(work)
  },

  async create(request: Request, response: Response) {
    const { title, description, deadline, classroom } = request.body

    const workRespository = getRepository(Work)
    const classroomRepository = getRepository(Classroom)
    
    const classroomExists = await classroomRepository.findOne({ where: { id: classroom }})
    
    if(!classroomExists)
      return response.status(400).json("classroom do not exists")

    const work = workRespository.create({ title, description, deadline, classroom })
    await workRespository.save(work)
    return response.json(work)
  },

  async update(request: Request, response: Response) {
    const { title, description, deadline } = request.body
    const { id } = request.params
    const workRespository = getRepository(Work) 
    const work = await workRespository.findOne({ where: { id }}) 
    if(!work) {
      return response.sendStatus(404)
    }
    work.title = title
    work.description = description
    work.deadline = deadline
    await workRespository.save(work)
    return response.json(work)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const workRespository = getRepository(Work) 
    const work = await workRespository.findOne({ where: { id }})  
    if(!work) {
      return response.sendStatus(404)
    }
    await workRespository.remove(work)
    return response.sendStatus(200)
  },
}
