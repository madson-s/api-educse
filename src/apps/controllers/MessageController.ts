import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Message from '../models/Message'
import Student from '../models/Student'
import Teacher from '../models/Teacher'
import Classroom from '../models/Classroom'

export default {
  async createStudentMessage(request: Request, response: Response) {
    
    const { text, student, sentAt, socketId, classroom, chat } = request.body
    const createdAt = new Date().getTime()
 
    const messageRepository = getRepository(Message)
    const studentRepository = getRepository(Student)
    const classroomRepository = getRepository(Classroom)

    try {
      const studentExist = await studentRepository.findOne({ where: { id: student }})
      const classroomExist = await classroomRepository.findOne({ where: { id: classroom }})
  
      if(!studentExist || !classroomExist)
        return response.status(400)
  
      const message = messageRepository.create({ text, sentAt, createdAt, classroom, student, chat })
      await messageRepository.save(message)
      message.student = studentExist
      
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

  async createTeacherMessage(request: Request, response: Response) {
    
    const { text, teacher, sentAt, socketId, classroom, chat } = request.body
    const createdAt = new Date().getTime()
    
    const messageRepository = getRepository(Message)
    const teacherRepository = getRepository(Teacher)
    const classroomRepository = getRepository(Classroom)

    try {
      const teacherExist = await teacherRepository.findOne({ where: { id: teacher }})
      const classroomExist = await classroomRepository.findOne({ where: { id: classroom }})
  
      if(!teacherExist || !classroomExist)
        return response.status(400)
  
      const message = messageRepository.create({ text, sentAt, createdAt, classroom, teacher, chat })
      await messageRepository.save(message)
      message.teacher = teacherExist

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