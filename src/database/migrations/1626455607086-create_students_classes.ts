import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createStudentsClasses1626455607086 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'students_classrooms_classes',
        columns: [
          {
            name: 'studentsId',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'classesId',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'StudentClassStudent',
            columnNames: ['studentsId'],
            referencedTableName: 'students',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'StudentClassClass',
            columnNames: ['classesId'],
            referencedTableName: 'classes',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('students_classes');
    }

}
