import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BeforeInsert, BeforeUpdate, JoinTable } from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'
import bcrypt from 'bcryptjs'

import Classroom from './Classroom'

@Entity('students')
export default class Student {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  @IsNotEmpty()
  @Length(2, 30)
  name: string

  @Column()
  email: string

  @Column()
  username: string

  @Column()
  @IsNotEmpty()
  @Length(8, 15)
  password: string

  @Column()
  is_verified: boolean

  @ManyToMany(() => Classroom, classroom => classroom.students)
  @JoinTable()
  classrooms: Classroom[]


  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }
}