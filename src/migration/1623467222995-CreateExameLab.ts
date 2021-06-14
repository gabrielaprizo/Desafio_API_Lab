import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExameLab1623467222995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasDatabase('exames_labs')) {
            return;
        }

        await queryRunner.createTable(
            new Table({
              name: 'exames_labs',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
                },
                {
                  name: 'exame_id',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'laboratorio_id',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  isNullable: false,
                  default: 'CURRENT_TIMESTAMP',
                },
              ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error('Não pode ser removida manualmente. Crie uma migration para essa deleção');
    }

}
