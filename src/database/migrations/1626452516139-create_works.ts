import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createWorks1626452516139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'works',
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
            name: 'classroomId',
            type: 'integer',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'deadline',
            type: 'datetime',
          },
        ],
        foreignKeys: [
          {
            name: 'WorkClass',
            columnNames: ['classroomId'],
            referencedTableName: 'classrooms',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('works');
    }

}
