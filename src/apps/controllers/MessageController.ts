import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Message from '../models/Message'

export default {
  async create(request: Request, response: Response) {
    
    const { text, student, teacher, sentAt, socketId, classroom } = request.body
    const createdAt = new Date().toLocaleString()
    const messageRepository = getRepository(Message)
    let origin

    if(student)
      origin = { student }
    else 
      origin = { teacher }
    
    try {
      const message = messageRepository.create({ text, sentAt, createdAt, classroom, ...origin })
      await messageRepository.save(message)
      request.io?.sockets.connected[socketId].broadcast.to(classroom).emit('message', message)
      response.status(200).json(message)
    }
    catch( err ) {
      console.log(err)
      response.status(500)
    }
  },
}