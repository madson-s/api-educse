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
  is_verified: boolean

  @OneToMany(() => Classroom, classroom => classroom.teacher)
  @JoinColumn({ name: 'teacher_id'})
  classrooms: Classroom[]

  @OneToMany(() => Document, document => document.teacher)
  @JoinColumn({ name: 'teacher_id'})
  documents: Document[]

  @ManyToMany(() => School, school => school.teachers)
  @JoinTable({
    name: 'teachers_schools',
    joinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'school_id',
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