import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnderecos1623465687970 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasDatabase('enderecos')) {
            return;
        }

        await queryRunner.createTable(
            new Table({
              name: 'enderecos',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
                },
                {
                  name: 'rua',
                  type: 'string',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'numero',
                  type: 'string',
                  length: '255',
                  isNullable: false,
                },
                {
                  name: 'complemento',
                  type: 'string',
                  length: '255',
                  isNullable: true,
                },
                {
                    name: 'cep',
                    type: 'integer',
                    width: 10,
                    isNullable: true,
                },
                {
                  name: 'bairro',
                  type: 'string',
                  length: '255',
                  isNullable: true,
                },
                {
                  name: 'cidade',
                  type: 'string',
                  length: '255',
                  isNullable: true,
                },
                {
                  name: 'estado',
                  type: 'string',
                  length: '255',
                  isNullable: true,
                },
                {
                  name: 'pais',
                  type: 'string',
                  length: '255',
                  isNullable: true,
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error('Não pode ser removida manualmente. Crie uma migration para essa deleção');
    }

}
