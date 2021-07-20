import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm'
import Classroom from './Classroom'
import Message from './Message'

@Entity('chats')
export default class Chat {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @OneToOne(() => Classroom, classroom => classroom.chat)
  @JoinColumn({ name: 'class_id'})
  classroom: Classroom

  @OneToMany(() => Message, message => message.chat)
  messages: Message[]
}