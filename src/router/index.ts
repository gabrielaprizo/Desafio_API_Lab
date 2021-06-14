import express, { Router } from 'express';
import LaboratoriosRouter from './LaboratoriosRouter';
import ExamesRouter from './ExamesRouter';
import EnderecosRouter from './EnderecosRouter';

const router: Router = express.Router();

export default router
    .get('/', function (request, response) {
        return response.json(
            {
                'message': 'Gabb Prizo - API para prontuário eletrônico',
            }
        );
    })
    .use('/laboratorios', LaboratoriosRouter)
    .use('/exames', ExamesRouter)
    .use('/enderecos', EnderecosRouter);
