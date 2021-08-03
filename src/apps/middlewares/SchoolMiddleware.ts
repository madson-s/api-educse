import { Request, Response, NextFunction } from "express"
import { validateOrReject, IsNotEmpty, Length, IsString, IsNumber } from 'class-validator'

class UpdateSchoolParms {
 
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  name: string

  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  city: string
}

class CreateSchoolParms extends UpdateSchoolParms {
  
  @IsNotEmpty()
  @IsNumber()
  manager: number
}

export default {
  async update(request: Request, response: Response, next: NextFunction) {
  
    const { name, city } = request.body
    
    const school = new UpdateSchoolParms()
    
    school.name = name
    school.city = city
  
    try{
      await validateOrReject(school)
  
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  },
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { name, city, manager } = request.body
    
    const school = new CreateSchoolParms()
    
    school.name = name
    school.city = city
    school.manager = manager
  
    try{
      await validateOrReject(school)
      
      return next()
    }
    catch( err ) {
      return response.status(422).json(err)
    } 
  }
}