import express from 'express';
const corRouter = express.Router();
import corController from '../../controllers/cor/corController.mjs';

corRouter.get('/buscaCores', corController.buscaCores)

export default corRouter