import express from 'express'
const transfRouter = express.Router();
import transferenciaController from '../../controllers/transacao/transferenciaController.mjs';

transfRouter.post('/addTransf', transferenciaController.addTransferencia)

export default transfRouter