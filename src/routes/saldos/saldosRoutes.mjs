import express from 'express'
const saldosRouter = express.Router();
import saldosCotroller from '../../controllers/saldos/saldosCotroller.mjs';

saldosRouter.get('/saldoGeral', saldosCotroller.saldoGeral)

export default saldosRouter