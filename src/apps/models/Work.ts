import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import Classroom from './Classroom'

@Entity('works')
export default class Work {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  deadline: Date

  @ManyToOne(() => Classroom, classroom => classroom.works)
  @JoinColumn()
  classroom: Classroom
}