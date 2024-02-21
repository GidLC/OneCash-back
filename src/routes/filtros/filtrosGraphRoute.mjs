import express from 'express';
const filtrosGraphRouter = express.Router();
import filtrosGraphController from '../../controllers/filtros/filtrosGraphController.mjs';

filtrosGraphRouter.get('/saldoPorCategoria', filtrosGraphController.receitaPorCategoria);

export default filtrosGraphRouter