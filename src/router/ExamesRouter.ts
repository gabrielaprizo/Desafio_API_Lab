import express, { Router } from 'express';
import * as ExamesController from '../controller/ExamesController';

import { body as RequestBody, param as RequestParam } from 'express-validator';

import { Status as AvailableStatuses } from '../support/entities/Status';
import { tiposExame } from '../entity/Exames';

const router: Router = express.Router();

export default router
    .get(
        '/',
        ExamesController.listAction
    )
    .get(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt().exists()
        ],
        ExamesController.getAction
    )
    .put(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt().exists(),
            RequestBody('nome', 'nome.nao.preenchido').exists(),
            RequestBody('status', 'status.invalido').bail().exists().custom((value) => value in AvailableStatuses),
            RequestBody('tipo', 'tipo.invalido').bail().exists().custom((value) => value in tiposExame),
            RequestBody('laboratorios').bail()
                .exists().withMessage('laboratorios.nao.preenchido'),
            RequestBody('laboratorios.*').bail()
                .isNumeric().withMessage('elementos.do.laboratorios.devem.ser.numeros')
        ],
        ExamesController.updateAction
    )
    .delete(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt().exists()
        ],
        ExamesController.deleteAction
    )
    .post(
        '/',
        [ 
            RequestBody('nome', 'nome.nao.preenchido').exists(),
            RequestBody('status', 'status.invalido').bail().exists().custom((value) => value in AvailableStatuses),
            RequestBody('tipo', 'tipo.invalido').bail().exists().custom((value) => value in tiposExame),
            RequestBody('laboratorios').bail()
                .exists().withMessage('laboratorios.nao.preenchido'),
            RequestBody('laboratorios.*').bail()
                .isNumeric().withMessage('elementos.do.laboratorios.devem.ser.numeros')
        ],
        ExamesController.createAction
    );
