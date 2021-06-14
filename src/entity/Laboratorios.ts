import { Length, IsEnum } from 'class-validator';
import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';

import { Status } from '../support/entities/Status';

import { ExamesLabs } from './ExamesLabs';
import { Enderecos } from './Enderecos';

@Entity('laboratorios')
export class Laboratorios {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    @Length(1, 255)
    nome!: string;

    @Column()
    @IsEnum(Status)
    status!: number;

    @Column()
    endereco_id!: number;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    updatedAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(type => ExamesLabs, exame => exame.laboratorios, { nullable: true })
    exames?: ExamesLabs[];

    @OneToOne(type => Enderecos, endereco => endereco.laboratorio, { nullable: true })
    @JoinColumn({ name: 'endereco_id', referencedColumnName: 'id' })
    endereco?: Enderecos;
}
