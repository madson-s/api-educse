import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, BeforeInsert, BeforeUpdate, JoinTable } from 'typeorm'
import bcrypt from 'bcryptjs'

import Classroom from './Classroom'

@Entity('students')
export default class Student {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  username: string

  @Column()
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