import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import Classroom from './Classroom'

@Entity('advices')
export default class Advice {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  deadline: Date

  @ManyToOne(() => Classroom, classroom => classroom.advices)
  @JoinColumn({ name: 'class_id'})
  classroom: Classroom
}