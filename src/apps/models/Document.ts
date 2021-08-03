import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, JoinTable , ManyToOne, ManyToMany } from 'typeorm'

import Teacher from './Teacher'
import Classroom from './Classroom'

@Entity('documents')
export default class Document {

  @PrimaryGeneratedColumn('increment')    
  id: number

  @Column()
  title: string

  @ManyToOne(() => Teacher, teacher => teacher.documents)
  @JoinColumn()
  teacher: Teacher

  @ManyToMany(() => Classroom, classroom => classroom.documents)
  @JoinTable({
    name: 'documents_classrooms',
    joinColumn: {
      name: 'documentId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'classroomId',
      referencedColumnName: 'id',
    }
  })
  classrooms: Classroom[]
}