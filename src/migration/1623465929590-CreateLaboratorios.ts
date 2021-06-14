import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { Status } from '../support/entities/Status';

export class CreateLaboratorios1623465929590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasDatabase('laboratorios')) {
            return;
        }

        await queryRunner.createTable(
            new Table({
              name: 'laboratorios',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
                },
                {
                  name: 'nome',
                  type: 'string',
                  isNullable: false,
                },
                {
                  name: 'status',
                  type: 'int',
                  isNullable: false,
                  default: Status.ATIVO,
                },
                {
                    name: 'endereco_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  isNullable: false,
                  default: 'CURRENT_TIMESTAMP',
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  isNullable: true,
                },
                {
                  name: 'deletedAt',
                  type: 'timestamp',
                  isNullable: true,
                },
              ],
              foreignKeys: [
                {
                  name: "enderecoLabFK",
                  referencedTableName: "enderecos",
                  referencedColumnNames: ["id"],
                  columnNames: ["endereco_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE"
                },
              ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error('Não pode ser removida manualmente. Crie uma migration para essa deleção');
    }

}
