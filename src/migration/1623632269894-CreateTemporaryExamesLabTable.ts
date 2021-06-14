import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTemporaryExamesLabTable1623632269894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasDatabase('temporary_exames_labs')) {
            return;
        }

        await queryRunner.createTable(
            new Table({
              name: 'temporary_exames_labs',
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
              ],
              foreignKeys: [
                {
                  name: "exameLabFK",
                  referencedTableName: "laboratorios",
                  referencedColumnNames: ["id"],
                  columnNames: ["laboratorio_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE"
                },
                {
                  name: "labExameFK",
                  referencedTableName: "exames",
                  referencedColumnNames: ["id"],
                  columnNames: ["exame_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE"
                }
              ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error('Não pode ser removida manualmente. Crie uma migration para essa deleção');
    }

}
