import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Chat from '../models/Chat'
import Classroom from '../models/Classroom'

export default {
  
  async index (request: Request, response: Response) {
    const chatRespository = getRepository(Chat)
    const chats = await chatRespository.find()
    return response.json(chats)
  },
 
  async find(request: Request, response: Response) {
    const { id } = request.params
    const chatRespository = getRepository(Classroom) 
    const chat = await chatRespository.findOne({ where: { id }, relations: ['messages', 'messages.student', 'messages.teacher']}) 
    if(!chat) {
      return response.sendStatus(404)
    }
    return response.json(chat)
  },

  async store(request: Request, response: Response) {
    const { classroom } = request.body
    const chatRespository = getRepository(Chat)
    const chat = chatRespository.create({ classroom })
    await chatRespository.save(chat)
    return response.json(chat)
  },

  async remove(request: Request, response: Response) {
    const { id } = request.params 
    const chatRespository = getRepository(Chat) 
    const chat = await chatRespository.findOne({ where: { id }})  
    if(!chat) {
      return response.sendStatus(404)
    }
    await chatRespository.remove(chat)
    return response.sendStatus(200)
  },
}
