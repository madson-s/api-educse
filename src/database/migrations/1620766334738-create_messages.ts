import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createMessages1620766334738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,  
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'datetime',
          },
          {
            name: 'sentAt',
            type: 'datetime',
          },
          {
            name: 'classroomId',
            type: 'integer',
          },
          {
            name: 'teacherId',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'studentId',
            type: 'integer',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'MessageClassroom',
            columnNames: ['classroomId'],
            referencedTableName: 'classrooms',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'MessageTeacher',
            columnNames: ['teacherId'],
            referencedTableName: 'teachers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'MessageStudents',
            columnNames: ['studentId'],
            referencedTableName: 'students',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('messages')
    }

}
