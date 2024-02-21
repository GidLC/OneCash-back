import DespesaColModel from "../../models/transacao/despesaColModel.mjs";

const addDespesaCol = (req, res) => {
    const { descricao, valor, categoria, status, data, banco } = req.body;
    const cod_casal = req.header('auth');
    const usuario = req.header('usuario')

    DespesaColModel.addDespesaCol(descricao, valor, usuario, cod_casal, categoria, status, data, banco, (err, resultado) => {
        if (err) {
            console.error('Erro ao cadastrar despesa:', err);
            return res.status(500).json({ error: 'Erro ao cadastrar despesa' })
        }
        res.status(200).json({ message: 'Despesa cadastrada com sucesso', resultado })
    });
};

const readDespesaCol = (req, res) => {
    const casal = req.header('auth');
    const usuario = req.header('usuario');
    const mes = req.header('mes');
    const ano = req.header('ano');

    DespesaColModel.readDespesaCol(usuario, casal, mes, ano, (err, results) => {
        if(err) {
            console.error('Erro ao encontrar despesas:', err);
            return res.status(500).json({error: 'Erro ao encontrar despesas'});
        }
        res.status(200).json({message: 'Despesas encontradas com sucesso', results})
    })
}


export default { addDespesaCol, readDespesaCol }