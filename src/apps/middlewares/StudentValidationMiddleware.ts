import { Request, Response, NextFunction } from "express"
import { validateOrReject, isEmpty } from 'class-validator'

import Student from '../models/Student'

export default async function StudentValidationMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const { name, email, password, username } = request.body
  
  const student = new Student()
  
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
}

const customError = (student: Student) => { 
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