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
  @JoinColumn({ name: 'teacher_id'})
  teacher: Teacher

  @ManyToMany(() => Classroom, classroom => classroom.documents)
  @JoinTable({
    name: 'documents_classes',
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    }
  })
  classrooms: Classroom[]
}