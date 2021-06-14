import express, { Router } from 'express';
import * as EnderecosController from '../controller/EnderecosController';

import { body as RequestBody, param as RequestParam } from 'express-validator';

const router: Router = express.Router();

export default router
    .get(
        '/',
        EnderecosController.listAction
    )
    .get(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt().exists()
        ],
        EnderecosController.getAction
    )
    .put(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido')
                .isInt()
                .exists(),
            RequestBody('rua', 'rua.nao.preenchido').exists(),
            RequestBody('numero', 'numero.nao.preenchido').exists(),
            RequestBody('cep').bail()
                .isNumeric()
                .withMessage('cep.deve.ser.numerico')
                .isLength({ min: 8, max: 8 })
                .withMessage('cep.tamanho.invalido.devem.ser.8.digitos')
                .exists()
                .withMessage('cep.deve.estar.preenchido'),
            RequestBody('bairro', 'bairro.nao.preenchido').exists(),
            RequestBody('cidade', 'cidade.nao.preenchido').exists(),
            RequestBody('estado', 'estado.nao.preenchido').exists(),
            RequestBody('pais', 'pais.nao.preenchido').exists(),
        ],
        EnderecosController.updateAction
    )
    .delete(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt().exists()
        ],
        EnderecosController.deleteAction
    )
    .post(
        '/',
        [ 
            RequestBody('rua', 'rua.nao.preenchido').exists(),
            RequestBody('numero', 'numero.nao.preenchido').exists(),
            RequestBody('cep').bail()
                .isNumeric()
                .withMessage('cep.deve.ser.numerico')
                .isLength({ min: 8, max: 8 })
                .withMessage('cep.tamanho.invalido.devem.ser.8.digitos')
                .exists()
                .withMessage('cep.deve.estar.preenchido'),
            RequestBody('bairro', 'bairro.nao.preenchido').exists(),
            RequestBody('cidade', 'cidade.nao.preenchido').exists(),
            RequestBody('estado', 'estado.nao.preenchido').exists(),
            RequestBody('pais', 'pais.nao.preenchido').exists(),
        ],
        EnderecosController.createAction
    );
