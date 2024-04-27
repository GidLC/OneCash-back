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

const readObjetivos = (req, res) => {
    const casal = req.header('auth')
    const status = req.header('status')

    ObjetivoModel.readObjetivos(casal, status, (err, results) => {
        if (err) {
            console.error('Erro ao obter objetivos')
            return res.status(500).json({error: 'Não foi possível obter os objetivos'})
        }

        res.status(200).json({message: 'OK', results})
    })
}

const deleteObjetivo  = (req, res) => {
    const casal = req.header('auth')
    const id = req.header('id')

    ObjetivoModel.deleteObjetivo(id, casal, (err, results) => {
        if (err) {
            return res.status(500).json({error: 'Não foi possível excluir esse objetivo'})
        }

        res.status(200).json({message: 'Objetivo excluido com sucesso', results})
    })
}

export default {addObjetivo, readObjetivos, deleteObjetivo}