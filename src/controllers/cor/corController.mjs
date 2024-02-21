import corModel from "../../models/cor/corModel.mjs";

const buscaCores = (req, res) => {
    corModel.buscaCores((err, results) => {
        if (err) {
            console.error('Não foi possível Encontrar as cores', err);
            return res.status(500).json({error: 'Não foi possível encontrar as cores'});
        }
        res.status(200).json({message: 'Cores encontradas com sucesso', results})
    });
};

export default {buscaCores}