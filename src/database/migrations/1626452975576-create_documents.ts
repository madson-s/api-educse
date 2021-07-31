import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDocuments1626452975576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'documents',
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
            name: 'teacherId',
            type: 'integer',
          },
          {
            name: 'title',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'DocumentTeacher',
            columnNames: ['teacherId'],
            referencedTableName: 'teachers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('documents');
    }

}
