import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Chat from './Chat';

@Entity('messages')
export default class Message {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  text: string

  @Column()
  origin: string;

  @Column()
  sent_at: Date

  @Column()
  create_at: Date

  @ManyToOne(() => Chat, chat => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat
}