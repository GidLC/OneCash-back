import frontModel from "../../models/front/frontModel.mjs";

const buscaCores = (req, res) => {
    frontModel.buscaCores((err, results) => {
        if (err) {
            console.error('Não foi possível Encontrar as cores', err);
            return res.status(500).json({ error: 'Não foi possível encontrar as cores' });
        }
        res.status(200).json({ message: 'Cores encontradas com sucesso', results })
    });
};

const buscaCorID = (req, res) => {
    const {id} = req.body;

    frontModel.buscaCorID(id, (err, results) => {
        if (err) {
            console.error('Não foi possível essa cor', err);
            return res.status(500).json({ error: 'Não foi possível essa cor' });
        }
        res.status(200).json({ message: 'Cor encontrada com sucesso', results })
    })
}

const buscaIcones = (req, res) => {
    frontModel.buscaIcones((err, results) => {
        if (err) {
            console.error('Não foi possível encontrar os ícones', err);
            return res.status(500).json({ error: 'Não foi possível encontrar os ícones' });
        }
        res.status(200).json({ message: 'Cores encontradas com sucesso', results })
    })
}

const buscaIconeID = (req, res) => {
    const {id} = req.body
    frontModel.buscaIconeID(id, (err, results) => {
        if (err) {
            console.error('Não foi possível encontrar o ícone', err);
            return res.status(500).json({ error: 'Não foi possível encontrar o ícone' });
        }
        res.status(200).json({ message: 'Icone encontrado com sucesso', results })
    })
}

export default { buscaCores, buscaIcones, buscaCorID, buscaIconeID }