import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSchools1626448259428 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'schools',
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
            name: 'managerId',
            type: 'integer',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'SchoolManager',
            columnNames: ['managerId'],
            referencedTableName: 'managers',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('schools');
    }

}
