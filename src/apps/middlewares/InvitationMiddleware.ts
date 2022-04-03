import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, IsString, IsNumber } from 'class-validator'

class CreateInvitation {
 
  @IsNotEmpty()
  @IsString()
  student: string
  
  @IsNotEmpty()
  @IsNumber()
  teacher: number

  @IsNotEmpty()
  @IsNumber()
  classroom: number
}

export default {
  async create(request: Request, response: Response, next: NextFunction) {
  
    const { student, teacher, classroom } = request.body
    
    const invitation = new CreateInvitation()
    
    invitation.student = student
    invitation.teacher = teacher
    invitation.classroom = classroom
  
    try{
      await validateOrReject(invitation)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
}