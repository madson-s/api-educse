import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'
import bcrypt from 'bcryptjs'

@Entity('managers')
export default class Managar {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  @IsNotEmpty()
  @Length(2, 30)
  name: string

  @Column()
  @IsNotEmpty()
  @Length(12)
  phone: string

  @Column()
  @IsNotEmpty()
  email: string

  @Column()
  @IsNotEmpty()
  @Length(8, 15)
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }
}