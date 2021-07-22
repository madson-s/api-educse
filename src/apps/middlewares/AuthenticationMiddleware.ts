import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, isEmpty } from 'class-validator'

class StudentAuth {
  
  @IsNotEmpty()
  @Length(2, 30)
  password: string;

  username: string;

  email: string;
}

class TeacherAuth {
  
  @IsNotEmpty()
  @Length(2, 30)
  password: string;

  @IsNotEmpty()
  email: string;
}

class ManagerAuth {
  
  @IsNotEmpty()
  @Length(2, 30)
  password: string;

  @IsNotEmpty()
  email: string;
}

export default {
  async student(request: Request, response: Response, next: NextFunction) {
  
    const { email, password, username } = request.body
    
    const student = new StudentAuth()
    
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
  
  async teacher(request: Request, response: Response, next: NextFunction) {
    
    const { email, password } = request.body
    
    const student = new TeacherAuth()
    
    student.email = email
    student.password = password
  
    try{
      await validateOrReject(student)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async manager(request: Request, response: Response, next: NextFunction) {
    
    const { email, password } = request.body
    
    const student = new ManagerAuth()
    
    student.email = email
    student.password = password
  
    try{
      await validateOrReject(student)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}

const customError = (student: StudentAuth) => { 
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