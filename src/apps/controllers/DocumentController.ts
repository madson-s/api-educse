import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Document from '../models/Document'

export default {
  
  async index (request: Request, response: Response) {
    const documentRespository = getRepository(Document)
    const documents = await documentRespository.find()
    return response.json(documents)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const documentRespository = getRepository(Document) 
    const document = await documentRespository.findOne({ where: { id }, relations: ['classrooms']}) 
    if(!document) {
      return response.sendStatus(404)
    }
    return response.json(document)
  },

  async create(request: Request, response: Response) {
    const { title, teacher } = request.body
    const documentRespository = getRepository(Document)
    const document = documentRespository.create({ title, teacher })
    await documentRespository.save(document)
    return response.json(document)
  },

  async update(request: Request, response: Response) {
    const { title } = request.body
    const { id } = request.params
    const documentRespository = getRepository(Document) 
    const document = await documentRespository.findOne({ where: { id }}) 
    if(!document) {
      return response.sendStatus(404)
    }
    document.title = title
    await documentRespository.save(document)
    return response.json(document)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const documentRespository = getRepository(Document) 
    const document = await documentRespository.findOne({ where: { id }})  
    if(!document) {
      return response.sendStatus(404)
    }
    await documentRespository.remove(document)
    return response.sendStatus(200)
  },
}
