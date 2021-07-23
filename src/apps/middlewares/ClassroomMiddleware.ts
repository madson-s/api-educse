import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString, IsNumber } from 'class-validator'

class UpdateClassroomParms {
 
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  name: string
}

class CreateClassroomParms extends UpdateClassroomParms {
  
  @IsNotEmpty()
  @IsNumber()
  teacher: number

  school: number
}

export default {
  async update(request: Request, response: Response, next: NextFunction) {
  
    const { name } = request.body
    
    let classroom = new UpdateClassroomParms()
    
    classroom.name = name
  
    try{
      await validateOrReject(classroom)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { name, teacher, school } = request.body
    
    let classroom = new CreateClassroomParms()
    
    classroom.name = name
    classroom.teacher = teacher
    classroom.teacher = school
  
    try{
      await validateOrReject(classroom)
      
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}