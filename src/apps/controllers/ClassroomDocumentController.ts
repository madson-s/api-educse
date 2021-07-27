import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Classroom from '../models/Classroom'
import Document from '../models/Document'

export default {

  async create(request: Request, response: Response) {

    const { classroomId, documentId } = request.body
    const classroomRespository = getRepository(Classroom)
    const studentRespository = getRepository(Document)
    let classroom = await classroomRespository.findOne({ where: { id: classroomId }})
    const document = await studentRespository.findOne({ where: { id: documentId }, relations: ['classrooms']})
    if(!document || !classroom)
      return response.sendStatus(404)
    document.classrooms.push(classroom)
    await studentRespository.save(document)
    return response.sendStatus(200)
  },

  async remove(request: Request, response: Response) {
    const { classroomId, documentId } = request.body
    const classroomRespository = getRepository(Classroom)
    const studentRespository = getRepository(Document)
    let classroom = await classroomRespository.findOne({ where: { id: classroomId }})
    const document = await studentRespository.findOne({ where: { id: documentId }, relations: ['classrooms']})
    if(!document || !classroom)
      return response.sendStatus(404)
    document.classrooms.filter(classroom => classroom.id !== classroomId)
    await studentRespository.save(document)
    return response.sendStatus(200)
  },
}
