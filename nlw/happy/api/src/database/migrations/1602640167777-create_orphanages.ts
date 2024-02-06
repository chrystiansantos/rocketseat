import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrphanages1602640167777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orphanages',
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
          { name: 'name', type: 'varchar', isNullable: false },
          {
            name: 'latitude',
            type: 'decimal',
            // scale numeros antes da virgula, precision numeros depois da virgula
            scale: 10,
            precision: 2,
          },
          {
            name: 'longitude',
            type: 'decimal',
            // scale numeros antes da virgula, precision numeros depois da virgula
            scale: 10,
            precision: 2,
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'instructions',
            type: 'text',
          },
          {
            name: 'opening_hours',
            type: 'text',
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            // valor padrao
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}
