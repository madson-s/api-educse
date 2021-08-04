import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, IsNumber } from 'class-validator'

class RemoveClassroomStudentParms {
 
  // @IsNotEmpty()
  // @IsNumber()
  studentId: number

  @IsNotEmpty()
  @IsNumber()
  classroomId: number
}

class CreateClassroomStudentParms extends RemoveClassroomStudentParms {
  
}

export default {
  async remove(request: Request, response: Response, next: NextFunction) {
  
    const { classroomId, studentId } = request.body
    
    const classroomStudent = new RemoveClassroomStudentParms()
    
    classroomStudent.studentId = studentId
    classroomStudent.classroomId = classroomId
  
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
    
    classroomStudent.studentId = studentId
    classroomStudent.classroomId = classroomId
  
    try{
      await validateOrReject(classroomStudent)
      
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}