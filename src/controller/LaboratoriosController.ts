import { Request, Response, Router } from 'express';
import { FindManyOptions, getConnection, getRepository, Like, Repository } from 'typeorm';
import { body as RequestBody, validationResult } from 'express-validator';

import { Enderecos } from '../entity/Enderecos';
import { Laboratorios } from '../entity/Laboratorios';

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

        const repo = getRepository(Laboratorios);

        const options = {
            take: limit,
            skip: offset,
            relations: ['endereco', 'exames'],
        } as FindManyOptions<Laboratorios>;

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
        const repo = getRepository(Laboratorios);
        const result = await repo.findOne(
            id, {
                relations: ['endereco', 'exames'],
            }
        );

      if (!result) {
        throw new HttpException('laboratorio.nao.encontrado', HttpStatus.UNPROCESSABLE_ENTITY);
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
        const { nome, status, endereco_id } = request.body;

        const labRepo = getRepository(Laboratorios);
        const lab = labRepo.findOne(id);

        if (!lab) {
            throw new HttpException('laboratorio.nao.encontrado', HttpStatus.NOT_FOUND);
        }

        const enderecoRepo = getRepository(Enderecos);
        const endereco = enderecoRepo.findOne(endereco_id);

        if (!endereco) {
            throw new HttpException('endereco.nao.encontrado', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const dataObject = {
            'nome': nome,
            'status': status,
            'endereco_id': Number(endereco_id)
        };

        await labRepo.update(id, dataObject);

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

        const { nome, status, endereco_id } = request.body;

        const enderecoRepo = getRepository(Enderecos);
        const endereco = enderecoRepo.findOne(endereco_id);

        if (!endereco) {
            throw new HttpException('endereco.nao.encontrado', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const dataObject = {
            'nome': nome,
            'status': status,
            'endereco_id': Number(endereco_id)
        };
        const labRepo = getRepository(Laboratorios);
        const result = await labRepo.save(dataObject);

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
        const repo = getRepository(Laboratorios);
        const result = await repo.findOne(id);

        if (!result) {
            throw new HttpException('laboratorio.nao.encontrado', HttpStatus.UNPROCESSABLE_ENTITY);
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