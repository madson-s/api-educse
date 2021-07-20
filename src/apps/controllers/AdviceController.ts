import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Advice from '../models/Advice'

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

  async store(request: Request, response: Response) {
    const { title, description, deadline, classroom } = request.body
    const adviceRespository = getRepository(Advice)
    const advice = adviceRespository.create({ title, description, deadline, classroom })
    await adviceRespository.save(advice)
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
