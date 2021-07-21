import { Request, Response, NextFunction } from "express"
import { validateOrReject } from 'class-validator'

import Teacher from '../models/Teacher'

export default async function TeacherValidationMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const { name, email, phone, password } = request.body
  
  let teacher = new Teacher()
  
  teacher.name = name
  teacher.email = email
  teacher.phone = phone
  teacher.password = password

  try{
    await validateOrReject(teacher)

    return next()
  }
  catch( err ) {
    return response.status(422).json(err)
  } 
}