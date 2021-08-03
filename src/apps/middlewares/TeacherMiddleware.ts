import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString } from 'class-validator'

class UpdateTeacherParams {
  
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name: string

  @IsNotEmpty()
  @IsString()
  @Length(11)
  phone: string
}

class CreateTeacherParams extends UpdateTeacherParams {
  
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  email: string
  
    
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password: string
}

export default {
  async create(request: Request, response: Response, next: NextFunction) {
    const { name, email, phone, password } = request.body
  
    let teacher = new CreateTeacherParams()
    
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
  },

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, phone } = request.body
  
    let teacher = new UpdateTeacherParams()
    
    teacher.name = name
    teacher.phone = phone

    try{
      await validateOrReject(teacher)

      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}