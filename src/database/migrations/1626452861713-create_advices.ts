import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAdvices1626452861713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'advices',
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
            name: 'AdviceClass',
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
      await queryRunner.dropTable('advices');
    }

}
