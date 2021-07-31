import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import bcrypt from 'bcryptjs'

import Classroom from './Classroom'
import Document from './Document'
import School from './School'

@Entity('teachers')
export default class Teacher {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  isVerified: boolean

  @OneToMany(() => Classroom, classroom => classroom.teacher)
  classrooms: Classroom[]

  @OneToMany(() => Document, document => document.teacher)
  documents: Document[]

  @ManyToMany(() => School, school => school.teachers)
  @JoinTable({
    name: 'teachers_schools',
    joinColumn: {
      name: 'teacherId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'schoolId',
      referencedColumnName: 'id',
    }
  })
  schools: School[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }
}