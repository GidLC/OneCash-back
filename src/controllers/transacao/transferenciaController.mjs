import TransfModel from '../../models/transacoes/transferenciaModel.mjs'

const addTransferencia = (req, res) => {
    const casal = req.header('auth');
    const usuario = req.header('usuario');
    const { valor, data, bancoOrigem, bancoDestino } = req.body;

    TransfModel.addTransferencia(casal, valor, usuario, data, bancoOrigem, bancoDestino, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Não foi possível realizar essa transferência' });
        }

        res.status(200).json({ message: 'Transferência realizada com sucesso', results });
    })
}

export default { addTransferencia }