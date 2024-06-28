import express from 'express'
const saldosRouter = express.Router();
import saldosCotroller from '../../controllers/saldos/saldosCotroller.mjs';

saldosRouter.get('/saldoGeral', saldosCotroller.saldoGeral)
saldosRouter.get('/saldoPeriodo', saldosCotroller.saldoPorPeriodo)

export default saldosRouter