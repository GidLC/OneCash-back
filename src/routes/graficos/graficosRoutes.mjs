import express from 'express';
const graficosRouter = express.Router();
import GraficosControllers from '../../controllers/graficos/GraficosControllers.mjs';

graficosRouter.get('/saldoPorCategoria', GraficosControllers.receitaPorCategoria);

export default graficosRouter