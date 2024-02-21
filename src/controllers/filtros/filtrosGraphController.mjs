import filtrosGraphModel from "../../models/filtros/filtrosGraphModel.mjs";

const receitaPorCategoria = (req, res) => {
    const casal = req.header('auth');
    
    filtrosGraphModel.receitaPorCategoria(casal, (err, results) => {
        if(err) {
            return res.status(500).json({error: 'Não foi possível encontrar os saldos das categorias'});
        }

        res.status(200).json({message: 'Saldos encontrados com sucesso', results});
    });
};

export default {receitaPorCategoria}