import { app } from './config.mjs';
import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

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
import whatsRouter from './routes/whats/whatsRoutes.mjs';

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
app.use('/api/whats', whatsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});

const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log("Whatsapp conectado");
});

client.initialize();

export const sendMessage = async (num, msg) => {
  const chatId = num.substring(1) + "@c.us";
  try {
    const response = await client.sendMessage(chatId, msg);
    console.log('Mensagem enviada com sucesso:', response);
    return `Mensagem enviada com sucesso: ${response}`;
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
    return `Erro ao enviar a mensagem: ${error}`;
  }
};

export default PORT;
