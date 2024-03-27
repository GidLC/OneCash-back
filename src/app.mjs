// app.js
import { app } from './config.mjs';
import authRouter from './routes/autenticacao/authRoutes.mjs';
import bancoRouter from './routes/banco/bancoRoutes.mjs';
import CategoriaTrRouter from './routes/categoria/CategoriaTrRoutes.mjs';
import frontRouter from './routes/front/frontRoutes.mjs';
import enviaEmailRouter from './routes/mail/enviaEmailRoutes.mjs';
import compraRouter from './routes/transacao/compraRoutes.mjs';
import despesaRouter from './routes/transacao/despesaRoutes.mjs';
import receitaRouter from './routes/transacao/receitaRoutes.mjs';
import graficosRouter from './routes/graficos/GraficosRoutes.mjs';
import saldosRouter from './routes/saldos/saldosRoutes.mjs';

app.use('/api/auth', authRouter) //autenticação (login, vinculação, cadastro, esqueci a senha)
app.use('/api/receita', receitaRouter) // gerencia receita
app.use('/api/despesa', despesaRouter) //Gerencia despesas
app.use('/api/compra', compraRouter) //Gerencia compras nos supermercados
app.use('/api/banco', bancoRouter) //Gerencia Contas Bancárias
app.use('/api/categoriaTr', CategoriaTrRouter) //Gerencia Categorias de Transações
app.use('/api/front', frontRouter) //Busca dados de uso do front como cores e ícones
app.use('/api/graph', graficosRouter) //Busca dados para gráficos
app.use('/api/email', enviaEmailRouter) //Envia emails a partir do front-end
app.use('/api/saldos', saldosRouter) //

const PORT = process.env.PORT || 8050;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});

export default PORT
