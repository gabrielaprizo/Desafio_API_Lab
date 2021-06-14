import {MigrationInterface, QueryRunner, Table} from "typeorm";

import { Status } from "../support/entities/Status";

import { tiposExame } from '../entity/Exames';

export class CreateTemporaryExamesTable1623632203424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasDatabase('temporary_exames')) {
            return;
        }

        await queryRunner.createTable(
            new Table({
              name: 'temporary_exames',
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
                  type: 'integer',
                  isNullable: false,
                  default: Status.ATIVO,
                },
                {
                  name: 'tipo',
                  type: 'integer',
                  isNullable: false,
                  default: tiposExame.tipoSemTipo,
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
