import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, ManyToMany} from 'typeorm'

import Manager from './Manager'
import Teacher from './Teacher'
import Classroom from './Classroom'

@Entity('schools')
export default class School {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  name: string

  @Column()
  city: string

  @ManyToOne(() => Manager)
  @JoinColumn()
  manager: Manager

  @OneToMany(() => Classroom, classroom => classroom.school)
  classrooms: Classroom[]
  
  @ManyToMany(() => Teacher, teacher => teacher.schools)
  teachers: Teacher[]
}