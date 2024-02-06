import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createImages1602645389838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            // nunca poderar ser um numero negativo
            unsigned: true,
            // indico que sera PK
            isPrimary: true,
            // vai ser gerada automaticamente
            isGenerated: true,
            // forma como sera gerada
            generationStrategy: 'increment',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            // relacionamente de um pra muitos, um orfanato tem varias imagens
            // uma imagem pertencera a um orfanato
            name: 'orphanage_id',
            type: 'integer',
          },
        ],
        // aqui irei passar as chaves estrangeiras
        foreignKeys: [
          {
            name: 'ImageOrphanage',
            columnNames: ['orphanage_id'],
            referencedTableName: 'orphanages',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
