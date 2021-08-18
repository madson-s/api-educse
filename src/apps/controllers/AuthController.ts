import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Teacher from '../models/Teacher'
import Student from '../models/Student'
import Managar from '../models/Manager'

interface TokePayload {
  id: string;
  iat: number;
  exp: number;
}

export default {
  async teacherAuthenticate(request: Request, response: Response) {
    
    const { password, email } = request.body
    
    const teacherRespository = getRepository(Teacher)
    const teacher = await teacherRespository.findOne({ where: { email }}) 
    
    if(!teacher) {
      return response.sendStatus(401)
    }
    
    const isValidPassword = await bcrypt.compare(password, teacher.password)
    
    if(!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = jwt.sign({id: teacher.id}, 'secret') 

    return response.json({ teacher, token, })
  },

  async teacherRevalidate(request: Request, response: Response) {
    
    const { authorization } = request.headers
 
    if(!authorization) {
      return response.sendStatus(401)
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
      const data  = jwt.verify(token, 'secret')
      
      const { id } = data as TokePayload
      
      request.userId = id 
     
      const teacherRespository = getRepository(Teacher)
      const teacher = await teacherRespository.findOne({ where: { id }}) 
      
      if(!teacher) {
        return response.sendStatus(401)
      }

      return response.json({ teacher, token, })
    } 
    catch {
      return response.sendStatus(401)
    }
  },

  async studentAuthenticate(request: Request, response: Response) {
    
    const { password, email, username } = request.body

    const studentRespository = getRepository(Student)
    
    let student = await studentRespository.findOne({ where: [{ email }, { username }]})      
    
    if(!student) {
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, student.password)
    
    if(!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = jwt.sign({id: student.id}, 'secret') 

    return response.json({ student, token, })
  },

  async studentRevalidate(request: Request, response: Response) {
    
    const { authorization } = request.headers
 
    if(!authorization) {
      return response.sendStatus(401)
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
      const data  = jwt.verify(token, 'secret')
      
      const { id } = data as TokePayload
      
      request.userId = id 
     
      const studentRespository = getRepository(Student)
      const student = await studentRespository.findOne({ where: { id }}) 
      
      if(!student) {  
        return response.sendStatus(401)
      }

      return response.json({ student, token, })
    } 
    catch {
      return response.sendStatus(401)
    }
  },

  async managerAuthenticate(request: Request, response: Response) {
    
    const { password, email } = request.body

    const managerRespository = getRepository(Managar)
    
    let manager = await managerRespository.findOne({ where: { email }})      
    
    if(!manager) {
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, manager.password)
    
    if(!isValidPassword) {
      return response.sendStatus(401)
    }

    const token = jwt.sign({id: manager.id}, 'secret') 

    return response.json({ manager, token, })
  },
}
