import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Classroom from '../models/Classroom'
import School from '../models/School'
import Teacher from '../models/Teacher'

export default {
  
  async index (request: Request, response: Response) {
    const classroomRespository = getRepository(Classroom)
    const classrooms = await classroomRespository.find()
    return response.json(classrooms)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const classroomRespository = getRepository(Classroom) 

    const classroom = await classroomRespository.findOne({ 
      where: { id }, 
      relations: ['school', 'teacher', 'students','documents', 'works', 'advices']
    }) 

    if(!classroom) {
      return response.sendStatus(404)
    }
    return response.json(classroom)
  },

  async create(request: Request, response: Response) {
    
    const { name, teacher, school } = request.body
    
    const classroomRespository = getRepository(Classroom)
    const teacherRespository = getRepository(Teacher)
    const schoolRespository = getRepository(School)
    
    const schoolExists = await schoolRespository.findOne({ where: { id: school }})
    const teacherExists = await teacherRespository.findOne({ where: { id: teacher }})

    if(!schoolExists) {
      return response.status(400).json("school do not exists")
    }

    if(!teacherExists) {
      return response.status(400).json("teacher do not exists")
    }

    const classroom = classroomRespository.create({ name, teacher, school })

    await classroomRespository.save(classroom)

    return response.json(classroom)
  },

  async update(request: Request, response: Response) {
    const { name } = request.body
    const { id } = request.params
    const classroomRespository = getRepository(Classroom) 
    const classroom = await classroomRespository.findOne({ where: { id }}) 
    if(!classroom) {
      return response.sendStatus(404)
    }
    classroom.name = name
    await classroomRespository.save(classroom)
    return response.json(classroom)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const classroomRespository = getRepository(Classroom) 
    const classroom = await classroomRespository.findOne({ where: { id }})  
    if(!classroom) {
      return response.sendStatus(404)
    }
    await classroomRespository.remove(classroom)
    return response.sendStatus(200)
  },
}
