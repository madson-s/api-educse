import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString } from 'class-validator'

class UpdateManagerParams {
  
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name: string

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  email: string
  
  @IsNotEmpty()
  @IsString()
  @Length(11)
  phone: string
  
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password: string
}

class CreateManagerParams extends UpdateManagerParams {

}

export default {
  async create(request: Request, response: Response, next: NextFunction) {
 
    const { name, email, phone, password } = request.body
    
    let manager = new CreateManagerParams()
    
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
  },

  async update(request: Request, response: Response, next: NextFunction) {
 
    const { name, email, phone, password } = request.body
    
    const manager = new UpdateManagerParams()
    
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
}
