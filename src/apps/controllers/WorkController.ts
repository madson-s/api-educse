import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Work from '../models/Work'

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

  async store(request: Request, response: Response) {
    const { title, description, deadline, classroom } = request.body
    const workRespository = getRepository(Work)
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
