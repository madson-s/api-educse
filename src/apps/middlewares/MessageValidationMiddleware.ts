import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString, IsNumber } from 'class-validator'

class UpdateMessageParms {
 
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

class CreateMessageParms extends UpdateMessageParms {
  
  @IsNotEmpty()
  @IsNumber()
  classroom: number
}

export async function UpdateMessageMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const { title, description, deadline } = request.body
  
  let message = new UpdateMessageParms()
  
  message.title = title
  message.description = description
  message.deadline = deadline

  try{
    await validateOrReject(message)

    return next()
  }
  catch( err ) {
    return response.status(422).json(err)
  } 
}

export async function CreateMessageMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const { title, description, deadline, classroom } = request.body
  
  let message = new CreateMessageParms()
  
  message.title = title
  message.description = description
  message.deadline = deadline
  message.classroom = classroom

  try{
    await validateOrReject(message)
    
    return next()
  }
  catch( err ) {
    return response.status(422).json(err)
  } 
}