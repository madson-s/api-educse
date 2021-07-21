import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Student from '../models/Student'

export default {
  
  async index (request: Request, response: Response) {
    const studentRespository = getRepository(Student)
    const students = await studentRespository.find({ relations: ['classrooms']})
    return response.json(students)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const studentRespository = getRepository(Student) 
    const student = await studentRespository.findOne({ where: { id }}) 
    if(!student) {
      return response.sendStatus(404)
    }
    return response.json(student)
  },

  async store(request: Request, response: Response) {
    const { name, email, password, username } = request.body
    const is_verified = false;

    const studentRespository = getRepository(Student)
    const studentExists = await studentRespository.findOne({ where: [{ name }, { email }]}) 
    if(studentExists) {
      return response.sendStatus(409)
    }

    
    

    const student = studentRespository.create({ name, email, username, password, is_verified })
    await studentRespository.save(student)
    return response.json(student)
  },

  async update(request: Request, response: Response) {
    const { name, email, password, username } = request.body
    const { id } = request.params
    const studentRespository = getRepository(Student) 
    const student = await studentRespository.findOne({ where: { id }}) 
    if(!student) {
      return response.sendStatus(404)
    }
    student.name = name
    student.email = email
    student.password = password
    student.username = username
    await studentRespository.save(student)
    return response.json(student)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const studentRespository = getRepository(Student) 
    const student = await studentRespository.findOne({ where: { id }})  
    if(!student) {
      return response.sendStatus(404)
    }
    await studentRespository.remove(student)
    return response.sendStatus(200)
  },
}
