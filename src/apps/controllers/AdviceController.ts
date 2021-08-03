import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Advice from '../models/Advice'
import Classroom from '../models/Classroom'

export default {
  
  async index (request: Request, response: Response) {
    const adviceRespository = getRepository(Advice)
    const advices = await adviceRespository.find()
    return response.json(advices)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const adviceRespository = getRepository(Advice) 
    const advice = await adviceRespository.findOne({ where: { id }}) 
    if(!advice) {
      return response.sendStatus(404)
    }
    return response.json(advice)
  },

  async create(request: Request, response: Response) {
   
    const { title, description, deadline, classroom } = request.body
    
    const adviceRepository = getRepository(Advice)
    const classroomRepository = getRepository(Classroom)
    
    const classroomExists = await classroomRepository.findOne({ where: { id: classroom }})
    
    if(!classroomExists)
      return response.status(400).json("classroom do not exists")

    const advice = adviceRepository.create({ title, description, deadline, classroom })
    
    await adviceRepository.save(advice)
    return response.json(advice)
  },

  async update(request: Request, response: Response) {
    const { title, description, deadline } = request.body
    const { id } = request.params
    const adviceRespository = getRepository(Advice) 
    const advice = await adviceRespository.findOne({ where: { id }}) 
    if(!advice) {
      return response.sendStatus(404)
    }
    advice.title = title
    advice.description = description
    advice.deadline = deadline
    await adviceRespository.save(advice)
    return response.json(advice)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const adviceRespository = getRepository(Advice) 
    const advice = await adviceRespository.findOne({ where: { id }})  
    if(!advice) {
      return response.sendStatus(404)
    }
    await adviceRespository.remove(advice)
    return response.sendStatus(200)
  },
}
