import express from 'express';
const receitaRouter = express.Router();
import receitaController from '../../controllers/transacao/receitaController.mjs'

receitaRouter.post('/addReceita', receitaController.addReceita)
receitaRouter.get('/readReceita', receitaController.readReceita)
receitaRouter.delete('/deleteReceita', receitaController.deleteReceita)
//receitaRouter.get('/listarReceitas', receitaController)

export default receitaRouter