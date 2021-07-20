import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTeachersSchools1626451871323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'teachers_schools',
        columns: [
          {
            name: 'teacher_id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'school_id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'TeacherSchoolTeacher',
            columnNames: ['teacher_id'],
            referencedTableName: 'teachers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'TeacherSchoolSchool',
            columnNames: ['school_id'],
            referencedTableName: 'schools',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('teachers_schools');
    }

}
