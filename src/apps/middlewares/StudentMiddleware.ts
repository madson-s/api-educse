import { Request, Response, NextFunction } from "express"
import { validateOrReject, isEmpty, Length, IsNotEmpty, IsString,IsOptional } from 'class-validator'

class UpdateStudentParams {

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name: string

  @IsOptional()
  @IsString()
  @Length(2, 50)
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password: string

  @IsOptional()
  @IsString()
  @Length(2, 15)
  username: string
}

class CreateStudentParams extends UpdateStudentParams {

}

export default {
  async create(request: Request, response: Response, next: NextFunction) {
  
    const { name, email, password, username } = request.body
    
    const student = new CreateStudentParams()
    
    student.name = name
    student.email = email
    student.password = password
    student.username = username
  
    try{
      await validateOrReject(student)
  
      if(isEmpty(email) && isEmpty(username)) {
        return response.status(422).json(customError(student))
      }
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },

  async update(request: Request, response: Response, next: NextFunction) {
  
    const { name, email, password, username } = request.body
    
    const student = new UpdateStudentParams()
    
    student.name = name
    student.email = email
    student.password = password
    student.username = username
  
    try{
      await validateOrReject(student)
  
      if(isEmpty(email) && isEmpty(username)) {
        return response.status(422).json(customError(student))
      }
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },

}

const customError = (student: CreateStudentParams) => { 
  return [{
    target: {
      ...student
    },
    value: '',
    property: 'email / username',
    children: [],
    constraints: { 
      isNotEmpty: " email and username should not be empty in the same time"
    }
  }]
}