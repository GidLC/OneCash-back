import express from 'express';
const frontRouter = express.Router();
import frontController from '../../controllers/front/frontController.mjs';

frontRouter.get('/buscaCores', frontController.buscaCores)
frontRouter.get('/buscaIcones', frontController.buscaIcones)


export default frontRouter