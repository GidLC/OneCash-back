import express from 'express'
const transfRouter = express.Router();
import transferenciaController from '../../controllers/transacao/transferenciaController.mjs';

transfRouter.post('/addTransf', transferenciaController.addTransferencia)
transfRouter.get('/readTransf', transferenciaController.readTransferencias)
transfRouter.delete('/deleteTransf', transferenciaController.deleteTransferencia)
transfRouter.get('/readTransfID', transferenciaController.readTransferenciaID)
transfRouter.put('/editTransf', transferenciaController.editTransferencia)

export default transfRouter