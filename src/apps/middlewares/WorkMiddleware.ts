import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString, IsNumber } from 'class-validator'

class UpdateWorkParms {
 
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  title: string
  
  @IsNotEmpty()
  @Length(2, 150)
  @IsString()
  description: string

  @IsNotEmpty()
  deadline: Date
}

class CreateWorkParms extends UpdateWorkParms {
  
  @IsNotEmpty()
  @IsNumber()
  classroom: number
}

export default {
  async update(request: Request, response: Response, next: NextFunction) {
  
    const { title, description, deadline } = request.body
    
    let work = new UpdateWorkParms()
    
    work.title = title
    work.description = description
    work.deadline = deadline
  
    try{
      await validateOrReject(work)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { title, description, deadline, classroom } = request.body
    
    let work = new CreateWorkParms()
    
    work.title = title
    work.description = description
    work.deadline = deadline
    work.classroom = classroom
  
    try{
      await validateOrReject(work)
      
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}