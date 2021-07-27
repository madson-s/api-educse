import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, IsNumber } from 'class-validator'

class RemoveSchoolTeacherParms {
 
  @IsNotEmpty()
  @IsNumber()
  schoolId: number

  @IsNotEmpty()
  @IsNumber()
  teacherId: number
}

class CreateSchoolTeacherParms extends RemoveSchoolTeacherParms {
  
}

export default {
  async remove(request: Request, response: Response, next: NextFunction) {
  
    const { schoolId, teacherId } = request.body
    
    const schoolTeacher = new RemoveSchoolTeacherParms()
    
    schoolTeacher.schoolId = schoolId
    schoolTeacher.teacherId = teacherId
  
    try{
      await validateOrReject(schoolTeacher)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { schoolId, teacherId } = request.body
    
    const schoolTeacher = new CreateSchoolTeacherParms()
    
    schoolTeacher.schoolId = schoolId
    schoolTeacher.teacherId = teacherId
  
    try{
      await validateOrReject(schoolTeacher)
      
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}