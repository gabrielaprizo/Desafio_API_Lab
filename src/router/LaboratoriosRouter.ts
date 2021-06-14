import express, { Router } from 'express';
import * as LaboratoriosController from '../controller/LaboratoriosController';

import { body as RequestBody, param as RequestParam } from 'express-validator';

import { Status as AvailableStatuses } from '../support/entities/Status';

const router: Router = express.Router();

export default router
    .get(
        '/',
        LaboratoriosController.listAction
    )
    .get(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt().exists()
        ],
        LaboratoriosController.getAction
    )
    .put(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt()
                .exists(),
            RequestBody('nome', 'nome.nao.preenchido').exists(),
            RequestBody('status', 'status.invalido').bail()
                .exists()
                .custom((value) => value in AvailableStatuses),
            RequestBody('endereco_id', 'endereco_id.nao.preenchido').exists(),
        ],
        LaboratoriosController.updateAction
    )
    .delete(
        '/:id',
        [
            RequestParam('id', 'id.nao.preenchido').isInt().exists()
        ],
        LaboratoriosController.deleteAction
    )
    .post(
        '/',
        [ 
            RequestBody('nome', 'nome.nao.preenchido').exists(),
            RequestBody('status', 'status.invalido').bail().exists().custom((value) => value in AvailableStatuses),
            RequestBody('endereco_id', 'endereco_id.nao.preenchido').exists(),
        ],
        LaboratoriosController.createAction
    );
