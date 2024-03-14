import DespesaModel from "../../models/transacao/despesaModel.mjs";

const addDespesa = (req, res) => {
    const { descricao, valor, categoria, status, data, banco } = req.body;
    const cod_casal = req.header('auth');
    const usuario = req.header('usuario')

    DespesaModel.addDespesa(descricao, valor, usuario, cod_casal, categoria, status, data, banco, (err, resultado) => {
        if (err) {
            console.error('Erro ao cadastrar despesa:', err);
            return res.status(500).json({ error: 'Erro ao cadastrar despesa' })
        }
        res.status(200).json({ message: 'Despesa cadastrada com sucesso', resultado })
    });
};

const readDespesa = (req, res) => {
    const casal = req.header('auth');
    const usuario = req.header('usuario');
    const mes = req.header('mes');
    const ano = req.header('ano');

    DespesaModel.readDespesa(usuario, casal, mes, ano, (err, results) => {
        if (err) {
            console.error('Erro ao encontrar despesas:', err);
            return res.status(500).json({ error: 'Erro ao encontrar despesas' });
        }
        res.status(200).json({ message: 'Despesas encontradas com sucesso', results })
    })
}

const readDespesaID = (req, res) => {
    const id = req.header('id');
    const usuario = req.header('usuario');
    const casal = req.header('auth');

    DespesaModel.readDespesaID(id, usuario, casal, (err, results) => {
        if (err) {
            console.error('Erro ao encontrar despesa:', err);
            return res.status(500).json({ error: 'Erro ao encontrar despesa' });
        }
        res.status(200).json({ message: 'Despesa encontrada com sucesso', results })
    })
}

const editDespesa = (req, res) => {
    const casal = req.header('auth');
    const usuario = req.header('usuario');
    const { id, descricao, categoria, valor, dia, mes, ano } = req.body

    DespesaModel.editReceita(casal, usuario, id, descricao, categoria, valor, dia, mes, ano, (err, results) => {
        if (err) {
            console.error('Erro ao editar a despesa', err);
            return res.status(500).json({ error: 'Erro ao editar a despesa' });
        }

        res.status(200).json({ message: 'Despesa editada com sucesso', results })
    })
}

const deleteDespesa = (req, res) => {
    const casal = req.header('auth');
    const usuario = req.header('usuario');
    const id = req.header('id');

    DespesaModel.deleteDespesa(casal, usuario, id, (err, results) => {
        if (err) {
            console.error('Erro ao excluir despesa:', err);
            return res.status(500).json({ error: 'Erro ao excluir despesa' });
        }
        res.status(200).json({ message: 'Despesas excluida com sucesso', results })
    })
}


export default { addDespesa, readDespesa, deleteDespesa, readDespesaID, editDespesa }