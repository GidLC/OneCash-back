import express from 'express';
const enviaEmailRouter = express.Router();
import enviaEmailController from '../../controllers/mail/enviaEmailController.mjs';


enviaEmailRouter.post('/enviaEmail', enviaEmailController.enviaEmail)


export default enviaEmailRouter