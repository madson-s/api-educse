import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDocumentsClasses1626453432152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'documents_classrooms',
        columns: [
          {
            name: 'documentId',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'classroomId',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'DocumentClassDocument',
            columnNames: ['documentId'],
            referencedTableName: 'documents',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'DocumentClassClass',
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
      await queryRunner.dropTable('documents_classrooms');
    }

}
