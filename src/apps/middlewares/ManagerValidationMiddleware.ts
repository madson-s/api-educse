import { Request, Response, NextFunction } from "express"
import { validateOrReject } from 'class-validator'

import Manager from '../models/Manager'

export default async function ManagerValidationMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const { name, email, phone, password } = request.body
  
  let manager = new Manager()
  
  manager.name = name
  manager.email = email
  manager.phone = phone
  manager.password = password

  try{
    await validateOrReject(manager)

    return next()
  }
  catch( err ) {
    return response.status(422).json(err)
  } 
}