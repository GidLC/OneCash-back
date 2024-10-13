import express from 'express';
const authRouter = express.Router();
import authController from '../../controllers/autenticacao/authController.mjs';

authRouter.post('/cadastro', authController.cadastroUsuario)
authRouter.get('/buscaCadastro', authController.buscaCadastro)
authRouter.put('/vincCadastro', authController.vincCadastro)
authRouter.post('/login', authController.loginUsuario)
authRouter.get('/buscaCadEmail', authController.buscaCadastroEmail)
authRouter.put('/mudaSenha', authController.mudaSenha)
authRouter.get('/validaToken', authController.validaToken)
authRouter.put('/editCadastro', authController.editUser)

export default authRouter;