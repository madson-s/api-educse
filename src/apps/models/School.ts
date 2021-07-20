import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany} from 'typeorm'

import Manager from './Manager'
import Teacher from './Teacher'

@Entity('schools')
export default class School {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  name: string

  @Column()
  city: string

  @ManyToOne(() => Manager)
  @JoinColumn({ name: 'manager_id'})
  manager: Manager

  @ManyToMany(() => Teacher, teacher => teacher.schools)
  teachers: Teacher[]
}