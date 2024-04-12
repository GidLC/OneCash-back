import ObjetivoModel from "../../models/objetivos/objetivoModel.mjs";

const addObjetivo = (req, res) => {
    const casal = req.header('auth')
    const {descricao, valor_final, valor_inicial, status, prazo, cor, icone} = req.body

    ObjetivoModel.addObjetivo(descricao, valor_final, valor_inicial, status, prazo, casal, cor, icone, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar objetivo', err);
            return res.status(500).json({ error: 'Erro ao cadastrar objetivo' });
        }

        res.status(200).json({ message: 'Objetivo cadastrado com sucesso', results });
    })
}

export default {addObjetivo}