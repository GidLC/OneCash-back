import express from 'express';
const despesaColRouter = express.Router();
import despesaColController from '../../controllers/transacao/despesaColController.mjs';

despesaColRouter.post('/addDespesaCol', despesaColController.addDespesaCol)
despesaColRouter.get('/readDespesaCol', despesaColController.readDespesaCol)

export default despesaColRouter