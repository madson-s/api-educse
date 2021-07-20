import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createMessages1620766334738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'messages',
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
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'origin',
            type: 'varchar',
          },
          {
            name: 'create_at',
            type: 'datetime',
          },
          {
            name: 'sent_at',
            type: 'datetime',
          },
          {
            name: 'chat_id',
            type: 'integer',
          }
        ],
        foreignKeys: [
          {
            name: 'MessageChat',
            columnNames: ['chat_id'],
            referencedTableName: 'chats',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('messages')
    }

}
