import { Request, Response, Router } from 'express';
import { FindManyOptions, getRepository } from 'typeorm';
import { validationResult } from 'express-validator';

import { Enderecos } from '../entity/Enderecos';

import { HttpException } from '../support/http/HttpException';
import { HttpStatus } from '../support/http/HttpStatus';
import { paginate } from '../support/pagination';

export const listAction = async (request: Request, response: Response) => {
    try {
        const { page, limit: total } = request.query;

        const { offset, limit } = paginate(
            Number(page),
            total ? Number(total) : 9
        );

        const repo = getRepository(Enderecos);

        const options = {
            take: limit,
            skip: offset,
            relations: ['laboratorio'],
            order: {'id': 'DESC'}
        } as FindManyOptions<Enderecos>;

        const totalResults = await repo.count(options);
        const result = await repo.find(options);

        return response.status(HttpStatus.PARTIAL_CONTENT)
            .json({
                'per_page': Number(limit),
                'total': Number(Math.ceil(totalResults / limit)),
                'current_page': Number(page),
                'data': result
            });
    } catch (error) {
        return response.status(error.statusCode || HttpStatus.SERVER_ERROR)
            .json(error.message);
    }
};

export const getAction = async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new HttpException({'errors': errors.array()}, HttpStatus.BAD_REQUEST);
        }

        const id = request.params.id
        const repo = getRepository(Enderecos);
        const result = await repo.findOne(
            id,
            {
                relations: ['laboratorio'],
            }
        );

        if (!result) {
            throw new HttpException({'errors': 'endereco.nao.encontrado'}, HttpStatus.NOT_FOUND);
        }

        return response.status(HttpStatus.OK)
            .json({
                'data': result
            });
    } catch (error) {
        return response.status(error.statusCode || HttpStatus.SERVER_ERROR)
            .json(error.message);
    }
};

export const updateAction = async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new HttpException({'errors': errors.array()}, HttpStatus.BAD_REQUEST);
        }

        const id = request.params.id;
        const { rua, numero, cep, bairro, cidade, estado, pais } = request.body;

        const repo = getRepository(Enderecos);
        const exame = repo.findOne(id);

        if (!exame) {
            throw new HttpException('endereco.nao.encontrado', HttpStatus.NOT_FOUND);
        }

        const dataObject = {
            'rua': rua,
            'numero': numero,
            'cep': cep,
            'bairro': bairro,
            'cidade': cidade,
            'estado': estado,
            'pais': pais
        };

        await repo.update(id, dataObject);

        return response.status(HttpStatus.NO_CONTENT)
            .json({});
    } catch (error) {
        return response.status(error.statusCode || HttpStatus.SERVER_ERROR)
            .json(error.message);
    }
};

export const createAction = async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new HttpException({'errors': errors.array()}, HttpStatus.BAD_REQUEST);
        }

        const { rua, numero, cep, bairro, cidade, estado, pais } = request.body;

        const dataObject = {
            'rua': rua,
            'numero': numero,
            'cep': cep,
            'bairro': bairro,
            'cidade': cidade,
            'estado': estado,
            'pais': pais
        };
        const repo = getRepository(Enderecos);
        const result = await repo.save(dataObject);

        return response.status(HttpStatus.ACCEPTED)
            .json({
                'data': result
            });
    } catch (error) {
        return response.status(error.statusCode || HttpStatus.SERVER_ERROR)
            .json(error.message);
    }
};

export const deleteAction = async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            throw new HttpException({'errors': errors.array()}, HttpStatus.BAD_REQUEST);
        }

        const id = request.params.id
        const repo = getRepository(Enderecos);
        const result = await repo.findOne(id);

        if (!result) {
            throw new HttpException({'errors': 'endereco.nao.encontrado'}, HttpStatus.NOT_FOUND);
        }

        await repo.update(id, {
            deletedAt: 'CURRENT_TIMESTAMP'
        });

        return response.status(HttpStatus.NO_CONTENT)
            .json({});
    } catch (error) {
        return response.status(error.statusCode || HttpStatus.SERVER_ERROR)
            .json(error.message);
    }
};