import express from 'express';
const authRouter = express.Router();
import authController from '../../controllers/autenticacao/authController.mjs';

authRouter.post('/cadastro', authController.cadastroUsuario)
authRouter.get('/buscaCadastro/:codigo', authController.buscaCadastro)
authRouter.put('/vincCadastro', authController.vincCadastro)
authRouter.post('/login', authController.loginUsuario)

export default authRouter;