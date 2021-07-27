import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, IsNumber } from 'class-validator'

class RemoveClassroomDocumentParms {
 
  @IsNotEmpty()
  @IsNumber()
  documentId: number

  @IsNotEmpty()
  @IsNumber()
  classroomId: number
}

class CreateClassroomDocumentParms extends RemoveClassroomDocumentParms {
  
}

export default {
  async remove(request: Request, response: Response, next: NextFunction) {
  
    const { classroomId, documentId } = request.body
    
    const classroomDocument = new RemoveClassroomDocumentParms()
    
    classroomDocument.documentId = documentId
    classroomDocument.classroomId = classroomId
  
    try{
      await validateOrReject(classroomDocument)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { classroomId, documentId } = request.body
    
    const classroomDocument = new CreateClassroomDocumentParms()
    
    classroomDocument.documentId = documentId
    classroomDocument.classroomId = classroomId
  
    try{
      await validateOrReject(classroomDocument)
      
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}