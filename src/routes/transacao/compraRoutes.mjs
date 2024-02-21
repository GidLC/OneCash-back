import express from 'express';
const compraRouter = express.Router();
import compraController from '../../controllers/transacao/compraController.mjs';

compraRouter.get('/buscaNF', compraController.buscaNF)

export default compraRouter