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
import transfRouter from './routes/transacao/transferenciaRoutes.mjs';
import objetivoRouter from './routes/objetivos/objetivosRoutes.mjs';

app.use('/api/auth', authRouter);
app.use('/api/receita', receitaRouter);
app.use('/api/despesa', despesaRouter);
app.use('/api/compra', compraRouter);
app.use('/api/banco', bancoRouter);
app.use('/api/categoriaTr', CategoriaTrRouter);
app.use('/api/front', frontRouter);
app.use('/api/graph', graficosRouter);
app.use('/api/email', enviaEmailRouter);
app.use('/api/saldos', saldosRouter);
app.use('/api/transf', transfRouter);
app.use('/api/objetivos', objetivoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});

export default PORT;
