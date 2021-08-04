import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString, IsNumber } from 'class-validator'

class MessageParms {
 
  @IsNotEmpty()
  text: string
  
  @IsNotEmpty()
  sentAt: string

  @IsNotEmpty()
  socketId: string

  @IsNotEmpty()
  @IsNumber()

  classroom: number

  @IsNotEmpty()
  @IsNumber()
  chat: number
}

class StudentMessageParms extends MessageParms {
  
  @IsNotEmpty()
  @IsNumber()
  student: number
}

class TeacherMessageParms extends MessageParms {
  
  @IsNotEmpty()
  @IsNumber()
  teacher: number
}

export default {
  async studentMessage(request: Request, response: Response, next: NextFunction) {
  
    const { text, student, sentAt, socketId, classroom, chat } = request.body
    
    const studentMessage = new StudentMessageParms()
    
    studentMessage.text = text
    studentMessage.student = student
    studentMessage.sentAt = sentAt
    studentMessage.socketId = socketId
    studentMessage.classroom = classroom
    studentMessage.chat = chat

    try{
      await validateOrReject(studentMessage)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async teacherMessage(request: Request, response: Response, next: NextFunction) {
    
    const { text, teacher, sentAt, socketId, classroom, chat } = request.body
    
    const teachermessage = new TeacherMessageParms()
    
    teachermessage.text = text
    teachermessage.teacher = teacher
    teachermessage.sentAt = sentAt
    teachermessage.socketId = socketId
    teachermessage.classroom = classroom
    teachermessage.chat = chat

    try{
      await validateOrReject(teachermessage)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}