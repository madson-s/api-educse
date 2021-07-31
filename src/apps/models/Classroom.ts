import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable, ManyToOne, OneToOne, OneToMany, ManyToMany } from 'typeorm'

import Teacher from './Teacher'
import Work from './Work'
import Advice from './Advice'
import Document from './Document'
import Chat from './Chat'
import Student from './Student'
import School from './School'
import Message from './Message'

@Entity('classrooms')
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

  @OneToMany(() => Message, message => message.classroom)
  messages: Message[]

  @ManyToOne(() => Teacher, teacher => teacher.classrooms)
  @JoinColumn()
  teacher: Teacher

  @ManyToOne(() => School, school => school.classrooms)
  @JoinColumn()
  school: School

  @ManyToMany(() => Document, document => document.classrooms)
  documents: Document[]

  @ManyToMany(() => Student, student => student.classrooms)
  students: Student[]
}