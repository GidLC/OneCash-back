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

const buscaIcones = (req, res) => {
    frontModel.buscaIcones((err, results) => {
        if (err) {
            console.error('Não foi possível encontrar os ícones', err);
            return res.status(500).json({ error: 'Não foi possível encontrar os ícones' });
        }
        res.status(200).json({ message: 'Cores encontradas com sucesso', results })
    })
}

export default { buscaCores, buscaIcones }