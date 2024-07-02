import express from 'express'
const saldosRouter = express.Router();
import saldosController from '../../controllers/saldos/saldosController.mjs';

saldosRouter.get('/saldoGeral', saldosController.saldoGeral)
saldosRouter.get('/saldoPeriodo', saldosController.saldoPorPeriodo)

export default saldosRouter