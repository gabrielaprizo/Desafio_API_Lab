import { Length, IsOptional, IsNumber, MinLength, MaxLength } from 'class-validator';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { Laboratorios } from './Laboratorios';

@Entity('enderecos')
export class Enderecos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(1, {
        message: 'preencha.o.campo.rua',
    })
    @MaxLength(255, {
        message: 'tamanho.maximo.255.caracteres.excedido.para.o.campo.rua'
    })
    rua!: string;

    @Column()
    @MinLength(1, {
        message: 'preencha.o.campo.numero',
    })
    @MaxLength(255, {
        message: 'tamanho.maximo.255.caracteres.excedido.para.o.campo.numero'
    })
    numero!: string;

    @Column({nullable: true})
    @MaxLength(255, {
        message: 'tamanho.maximo.255.caracteres.excedido.para.o.campo.complemento'
    })
    @IsOptional()
    complemento?: string;

    @Column()
    @IsNumber({}, {
        message: 'formato.invalido.para.o.cep',
    })
    @Length(8, 8, {
        message: 'campo.cep.deve.conter.8.digitos'
    })
    cep!: number;

    @Column()
    @MinLength(1, {
        message: 'preencha.o.campo.bairro',
    })
    @MaxLength(255, {
        message: 'tamanho.maximo.255.caracteres.excedido.para.o.campo.bairro'
    })
    bairro!: string;

    @Column()
    @MinLength(1, {
        message: 'preencha.o.campo.cidade',
    })
    @MaxLength(255, {
        message: 'tamanho.maximo.255.caracteres.excedido.para.o.campo.cidade'
    })
    cidade!: string;

    @Column()
    @MinLength(1, {
        message: 'preencha.o.campo.estado',
    })
    @MaxLength(255, {
        message: 'tamanho.maximo.255.caracteres.excedido.para.o.campo.estado'
    })
    estado!: string;

    @Column()
    @MinLength(1, {
        message: 'preencha.o.campo.pais',
    })
    @MaxLength(255, {
        message: 'tamanho.maximo.255.caracteres.excedido.para.o.campo.pais'
    })
    pais!: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToOne(type => Laboratorios, laboratorio => laboratorio.endereco, { nullable: true })
    laboratorio?: Laboratorios;
}