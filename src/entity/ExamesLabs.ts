import { Length, IsEnum } from 'class-validator';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Exames } from './Exames';
import { Laboratorios } from './Laboratorios';

@Entity('exames_labs')
export class ExamesLabs {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    exame_id!: number;

    @Column()
    laboratorio_id!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(type=> Laboratorios, laboratorio => laboratorio.exames, { nullable: true })
    @JoinColumn({ name: 'laboratorio_id', referencedColumnName: 'id' })
    laboratorios?: Laboratorios[];

    @ManyToOne(type => Exames, exame => exame.laboratorios, { nullable: true })
    @JoinColumn({ name: 'exame_id', referencedColumnName: 'id' })
    exames?: Exames[];
}