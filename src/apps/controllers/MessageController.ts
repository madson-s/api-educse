import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Message from '../models/Message'

export async function createMessage(text: string, origin: string, sent_at: string) {
  const create_at = new Date().toLocaleString()
  const messageRepository = getRepository(Message)
  const message = messageRepository.create({ text, origin, sent_at, create_at })
  await messageRepository.save(message)
  return message;
}

export default {
  async create(request: Request, response: Response) {
    const { text, origin, sent_at } = request.body
    const message = await createMessage(text, origin, sent_at)
    request.io?.emit('chat message', text)
    response.status(200).json()
  },
}