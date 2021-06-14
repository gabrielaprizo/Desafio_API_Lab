import { Length, IsEnum } from 'class-validator';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

import { Status } from '../support/entities/Status';

import { ExamesLabs } from './ExamesLabs';

export enum tiposExame {
    tipoSemTipo = 0,
    tipoAnaliseClinica = 1,
    tipoImagem = 2,
};

@Entity('exames')
export class Exames {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(1, 255)
    nome!: string;

    @Column()
    @IsEnum(Status)
    status!: number;

    @Column()
    @IsEnum(tiposExame)
    tipo!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(type => ExamesLabs, exame => exame.laboratorios, { nullable: true })
    laboratorios?: ExamesLabs[];
}