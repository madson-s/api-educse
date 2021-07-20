import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDocumentsClasses1626453432152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'documents_classes',
        columns: [
          {
            name: 'document_id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
          {
            name: 'class_id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'DocumentClassDocument',
            columnNames: ['document_id'],
            referencedTableName: 'documents',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'DocumentClassClass',
            columnNames: ['class_id'],
            referencedTableName: 'classes',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('documents_classes');
    }

}
