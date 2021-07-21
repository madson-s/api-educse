import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString, IsNumber } from 'class-validator'

class UpdateDocumentParms {

  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  title: string
}

class CreateDocumentParms extends UpdateDocumentParms {
  
  @IsNotEmpty()
  @IsNumber()
  teacher: number
}

export async function UpdateDocumentMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const { title } = request.body
  
  let document = new UpdateDocumentParms()
  
  document.title = title

  try{
    await validateOrReject(document)

    return next()
  }
  catch( err ) {
    return response.status(422).json(err)
  } 
}

export async function CreateDocumentMiddleware(request: Request, response: Response, next: NextFunction) {
  
  const { title, teacher } = request.body
  
  let document = new CreateDocumentParms()
  
  document.title = title
  document.teacher = teacher

  try{
    await validateOrReject(document)
    
    return next()
  }
  catch( err ) {
    return response.status(422).json(err)
  } 
}
