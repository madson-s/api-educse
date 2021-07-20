import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createClasses1626447269155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'classes',
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
            name: 'teacher_id',
            type: 'integer',
          },
          {
            name: 'name',
            type: 'varchar',
          }
        ],
        foreignKeys: [
          {
            name: 'ClassTeacher',
            columnNames: ['teacher_id'],
            referencedTableName: 'teachers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('classes');
    }

}
