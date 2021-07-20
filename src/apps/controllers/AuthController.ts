import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Teacher from '../models/Teacher'

export default {
  async authenticate(request: Request, response: Response) {
    
    const { password, email } = request.body
    
    const userRespository = getRepository(Teacher)
    const user = await userRespository.findOne({ where: { email }}) 
    
    if(!user) {
      return response.sendStatus(401)
    }

    console.log(user.password)

    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if(!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = jwt.sign({id: user.id}, 'secret', { expiresIn: '1d' }) 

    return response.json({ user, token, })
  },
}
