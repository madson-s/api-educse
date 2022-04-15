import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { PrismaClient } from '@prisma/client'

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
    const student = await studentRespository.findOne({ where: { id }, relations: ['classrooms', 'classrooms.school']}) 
    
    if(!student) {
      return response.sendStatus(404)
    }
    return response.json(student)
  },

  async create(request: Request, response: Response) {
    const { name, email, password, username } = request.body
    const is_verified = false
    const studentRespository = getRepository(Student)
    const where = username ? { where: { username }} : { where: { email }}  
    const studentExists = await studentRespository.findOne(where) 
    if(studentExists) {
      return response.sendStatus(409)
    }
    const studentName = name ? name : "Estudante "+ new Date().getTime();
    const student = studentRespository.create({ name: studentName, email, username, password, is_verified })
    await studentRespository.save(student)
    return response.json(student)
  },

  async update(request: Request, response: Response) {
    const { name } = request.body
    const { id } = request.params
    const studentRespository = getRepository(Student) 
    const student = await studentRespository.findOne({ where: { id }}) 
    if(!student) {
      return response.sendStatus(404)
    }
    student.name = name
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

  async getInvitations (request: Request, response: Response) {
    try {
      const  id = Number(request.params.id) 
      const prisma = new PrismaClient()
      const student = await prisma.students.findUnique({ where: { id }, include: {
        invitations: {
          select: {
            id: true,
            teacher: {
              select: {
                name: true,
              }
            },
            classroom: {
              select: {
                name: true,
              }
            },
          }
        }
      }})

      if(!student)
        return response.status(400).send('student not found')
      
      const { invitations } = student
      return response.send(invitations)

    } catch (error) {
      response.status(500).send('internal server error')
    }
  }
}
