import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import School from '../models/School'

export default {
  
  async index (request: Request, response: Response) {
    const schoolRespository = getRepository(School)
    const schools = await schoolRespository.find({
      relations: ['manager']
    })
    return response.json(schools)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const schoolRespository = getRepository(School) 
    const school = await schoolRespository.findOne({ where: { id }, relations: ['teachers']}) 
    if(!school) {
      return response.sendStatus(404)
    }
    return response.json(school)
  },

  async store(request: Request, response: Response) {
    const { name, city, manager } = request.body
    const schoolRespository = getRepository(School)
    const schoolExists = await schoolRespository.findOne({ where: { name }}) 
    if(schoolExists) {
      return response.sendStatus(409)
    }
    const school = schoolRespository.create({ name, city, manager })
    await schoolRespository.save(school)
    return response.json(school)
  },

  async update(request: Request, response: Response) {
    const { name, city, manager } = request.body
    const { id } = request.params
    const schoolRespository = getRepository(School) 
    const school = await schoolRespository.findOne({ where: { id }}) 
    if(!school) {
      return response.sendStatus(404)
    }
    school.name = name
    school.city = city
    school.manager = manager
    await schoolRespository.save(school)
    return response.json(school)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const schoolRespository = getRepository(School) 
    const school = await schoolRespository.findOne({ where: { id }})  
    if(!school) {
      return response.sendStatus(404)
    }
    await schoolRespository.remove(school)
    return response.sendStatus(200)
  },
}
