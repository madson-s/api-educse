import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Chat from '../models/Chat'
import Classroom from '../models/Classroom'
import Message from '../models/Message'

export default {
  
  async index (request: Request, response: Response) {
    const chatRespository = getRepository(Chat)
    const chats = await chatRespository.find()
    return response.json(chats)
  },
 
  async find(request: Request, response: Response) {
    
    const { id } = request.params
    const { page, offset } = request.body
    const messagesPerPage = 30
    const skip = ((page - 1) * messagesPerPage) + offset 

    const chatRespository = getRepository(Classroom) 
    const messageRepository = getRepository(Message)

    const chat = await chatRespository.findOne({ where: { id }}) 
    
    const messages = await messageRepository.find({ 
      relations: ['student', 'teacher'],
      where: { classroom: id }, 
      skip: skip, 
      take: messagesPerPage,
      order: {
        id: 'DESC',
      }
    })

    if(!chat) {
      return response.sendStatus(404)
    }

    chat.messages = messages

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
