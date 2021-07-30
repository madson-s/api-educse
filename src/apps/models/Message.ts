import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import Chat from './Chat';
import Classroom from './Classroom';
import Student from './Student';
import Teacher from './Teacher';

@Entity('messages')
export default class Message {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  text: string

  @Column()
  sentAt: Date

  @Column()
  createdAt: Date

  @ManyToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @ManyToOne(() => Student)
  @JoinColumn()
  student: Student;

  @ManyToOne(() => Classroom, classroom => classroom.messages)
  @JoinColumn()
  classroom: Classroom
}