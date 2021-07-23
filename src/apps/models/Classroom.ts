import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable, ManyToOne, OneToOne, OneToMany, ManyToMany } from 'typeorm'

import Teacher from './Teacher'
import Work from './Work'
import Advice from './Advice'
import Document from './Document'
import Chat from './Chat'
import Student from './Student'
import School from './School'


@Entity('classes')
export default class Classroom {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  name: string

  @OneToOne(() => Chat, chat => chat.classroom)
  chat: Chat

  @OneToMany(() => Work, work => work.classroom)
  works: Work[]

  @OneToMany(() => Advice, advice => advice.classroom)
  advices: Work[]

  @ManyToOne(() => Teacher, teacher => teacher.classrooms)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher

  @ManyToOne(() => School, school => school.classrooms)
  @JoinColumn({ name: 'schoolId'})
  school: School

  @ManyToMany(() => Document, document => document.classrooms)
  documents: Document[]

  @ManyToMany(() => Student, student => student.classrooms)
  students: Student[]
}