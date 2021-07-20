import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/User'

export default {
  async store(request: Request, response: Response) {
    const { name, password, email } = request.body
    const userRespository = getRepository(User)
    const userExists = await userRespository.findOne({ where: { email }}) 
    if(userExists) {
      return response.sendStatus(409)
    }
    const user = userRespository.create({ name, password, email })
    await userRespository.save(user)
    return response.json(user)
  },
}
