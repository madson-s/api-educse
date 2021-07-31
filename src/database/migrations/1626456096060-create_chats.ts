import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createChats1626456096060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'chats',
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
        ],
        foreignKeys: [
          {
            name: 'ChatClass',
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
      await queryRunner.dropTable('chats');
    }

}
