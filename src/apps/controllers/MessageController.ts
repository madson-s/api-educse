import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Message from '../models/Message'
import Student from '../models/Student'
import Teacher from '../models/Teacher'
import Classroom from '../models/Classroom'
import Chat from '../models/Chat'

export default {
  
  async createStudentMessage(request: Request, response: Response) {
    
    const { text, student, sentAt, socketId, classroom, chat } = request.body
    const createdAt = new Date().getTime()
 
    const messageRepository = getRepository(Message)
    const studentRepository = getRepository(Student)
    const classroomRepository = getRepository(Classroom)
    const chatRespository = getRepository(Chat)

    try {
      const studentExists = await studentRepository.findOne({ where: { id: student }})
      const classroomExists = await classroomRepository.findOne({ where: { id: classroom }})
      const chatExists = await chatRespository.findOne({ where: { id: chat }})
  
      if(!studentExists)
        return response.status(400).json("Teacher inexistente")

      if(!classroomExists)
        return response.status(400).json("Classroom inexistente")
  
      if(!chatExists)
        return response.status(400).json("Chat inexistente")
  
      const message = messageRepository.create({ text, sentAt, createdAt, classroom, student, chat })
      await messageRepository.save(message)
      message.student = studentExists

      const socket = request.io?.sockets.connected[socketId]
      if(socket)
        socket.to(classroom).emit('message', message)
        
      response.status(200).json(message)
    }
    catch( err ) {
      console.log(err)
      response.status(500).json(err)
    }
  },

  async createTeacherMessage(request: Request, response: Response) {
    
    const { text, teacher, sentAt, socketId, classroom, chat } = request.body
    const createdAt = new Date().getTime()
    
    const messageRepository = getRepository(Message)
    const teacherRepository = getRepository(Teacher)
    const classroomRepository = getRepository(Classroom)
    const chatRespository = getRepository(Chat)

    try {
      const teacherExists = await teacherRepository.findOne({ where: { id: teacher }})
      const classroomExists = await classroomRepository.findOne({ where: { id: classroom }})
      const chatExists = await chatRespository.findOne({ where: { id: chat }})
  
      if(!teacherExists)
        return response.status(400).json("Teacher inexistente")

      if(!classroomExists)
        return response.status(400).json("Classroom inexistente")
  
      if(!chatExists)
        return response.status(400).json("Chat inexistente")

      const message = messageRepository.create({ text, sentAt, createdAt, classroom, teacher, chat })
      await messageRepository.save(message)
      message.teacher = teacherExists

      const socket = request.io?.sockets.connected[socketId]

      if(socket)
        socket.to(classroom).emit('message', message)
      
      response.status(200).json(message)
    }
    catch( err ) {
      console.log(err)
      response.status(500)
    }
  },
}