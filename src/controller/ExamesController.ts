import { Request, Response, Router } from 'express';
import { FindManyOptions, getConnection, getRepository } from 'typeorm';
import { validationResult } from 'express-validator';

import { Exames } from '../entity/Exames';

import { HttpException } from '../support/http/HttpException';
import { HttpStatus } from '../support/http/HttpStatus';
import { paginate } from '../support/pagination';
import { Laboratorios } from '../entity/Laboratorios';
import { ExamesLabs } from '../entity/ExamesLabs';

export const listAction = async (request: Request, response: Response) => {
    try {
        const { page, limit: total } = request.query;

        const { offset, limit } = paginate(
            Number(page),
            total ? Number(total) : 9
        );

        const repo = getRepository(Exames);

        const options = {
            take: limit,
            skip: offset,
            relations: ['laboratorios'],
        } as FindManyOptions<Exames>;

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
        const repo = getRepository(Exames);
        const result = await repo.findOne(
            id,
            {
                relations: ['laboratorios'],
            }
        );

        if (!result) {
            throw new HttpException({'errors': 'exame.nao.encontrado'}, HttpStatus.NOT_FOUND);
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
        const { nome, status, tipo, laboratorios } = request.body;

        const repo = getRepository(Exames);
        const exame = repo.findOne(id);

        if (!exame) {
            throw new HttpException('exame.nao.encontrado', HttpStatus.NOT_FOUND);
        }

        const dataObject = {
            'nome': nome,
            'status': status,
            'tipo': tipo
        };

        repo.update(id, dataObject);

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(ExamesLabs)
            .where("`exame_id` = :id", { id: id })
            .execute();

        laboratorios.forEach(async (value: number) => {
            if (!value) {
                return;
            }

            if (!await getRepository(Laboratorios).findOne(value)) {
                return;
            }

            const exameLab = getRepository(ExamesLabs);
            await exameLab.save({
                'exame_id': Number(id),
                'laboratorio_id': Number(value)
            });
        });

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

        const { nome, status, tipo, laboratorios } = request.body;

        const dataObject = {
            'nome': nome,
            'status': status,
            'tipo': tipo
        };

        const repo = getRepository(Exames);
        const result = await repo.save(dataObject);

        laboratorios.forEach(async (value: number) => {
            if (!value) {
                return;
            }

            if (!await getRepository(Laboratorios).findOne(value)) {
                return;
            }

            const exameLab = getRepository(ExamesLabs);
            await exameLab.save({
                'exame_id': Number(result.id),
                'laboratorio_id': Number(value)
            });
        });

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
        const repo = getRepository(Exames);
        const result = await repo.findOne(id);

        if (!result) {
            throw new HttpException({'errors': 'exame.nao.encontrado'}, HttpStatus.NOT_FOUND);
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