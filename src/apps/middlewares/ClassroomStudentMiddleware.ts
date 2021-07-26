import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, IsNumber } from 'class-validator'

class UpdateClassroomStudentParms {
 
  @IsNotEmpty()
  @IsNumber()
  student: number

  @IsNotEmpty()
  @IsNumber()
  classroom: number
}

class CreateClassroomStudentParms extends UpdateClassroomStudentParms {
  
}

export default {
  async remove(request: Request, response: Response, next: NextFunction) {
  
    const { classroomId, studentId } = request.body
    
    const classroomStudent = new UpdateClassroomStudentParms()
    
    classroomStudent.student = studentId
    classroomStudent.student = classroomId
  
    try{
      await validateOrReject(classroomStudent)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { classroomId, studentId } = request.body
    
    const classroomStudent = new CreateClassroomStudentParms()
    
    classroomStudent.student = studentId
    classroomStudent.student = classroomId
  
  
    try{
      await validateOrReject(classroomStudent)
      
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}