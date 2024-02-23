// app.js
import { app } from './config.mjs';
import authRouter from './routes/autenticacao/authRoutes.mjs';
import bancoRouter from './routes/banco/bancoRoutes.mjs';
import CategoriaTrRouter from './routes/categoria/CategoriaTrRoutes.mjs';
import corRouter from './routes/cor/corRoutes.mjs';
import filtrosGraphRouter from './routes/filtros/filtrosGraphRoute.mjs';
import compraRouter from './routes/transacao/compraRoutes.mjs';
import despesaColRouter from './routes/transacao/despesaRoutes.mjs';
import receitaRouter from './routes/transacao/receitaRoutes.mjs';

app.use('/api/auth', authRouter) //autenticação (login, vinculação e cadastro)
app.use('/api/receita', receitaRouter) // gerencia receita
app.use('/api/despesaCol', despesaColRouter) //Gerencia despesa coletiva
app.use('/api/compra', compraRouter) //Gerencia compras nos supermercados
app.use('/api/banco', bancoRouter) //Gerencia Contas Bancárias
app.use('/api/categoriaTr', CategoriaTrRouter) //Gerencia Categorias de Transações
app.use('/api/cor', corRouter) //Busca as cores do banco de dados
app.use('/api/graph', filtrosGraphRouter) //Busca filtros e dados dos gráficos

const PORT = process.env.PORT || 8050;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
