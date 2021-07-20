import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Manager from '../models/Manager'

export default {

  async index(request: Request, response: Response) {
    const managerRespository = getRepository(Manager) 
    const managers = await managerRespository.find() 
    return response.json(managers)
  },
  
  async find(request: Request, response: Response) {
    const { id } = request.params

    const managerRespository = getRepository(Manager) 
    const manager = await managerRespository.findOne({ where: { id }}) 
    
    if(!manager) {
      return response.sendStatus(404)
    }

    return response.json(manager)
  },

  async store(request: Request, response: Response) {
    const { name, email, password, phone } = request.body

    const managerRespository = getRepository(Manager)
    const managerExists = await managerRespository.findOne({ where: { email }}) 
    if(managerExists) {
      return response.sendStatus(409)
    }
    const manager = managerRespository.create({ name, password, email, phone })
    await managerRespository.save(manager)
    return response.json(manager)
  },

  async update(request: Request, response: Response) {
    const { name, email, password, phone } = request.body
    const { id } = request.params
    const managerRespository = getRepository(Manager) 
    const manager = await managerRespository.findOne({ where: { id }}) 
    if(!manager) {
      return response.sendStatus(404)
    }
    manager.name = name
    manager.email = email
    manager.password = password
    manager.phone = phone
    await managerRespository.save(manager)
    return response.json(manager)
  },
}
