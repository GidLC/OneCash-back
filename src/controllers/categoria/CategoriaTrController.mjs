import CategoriaTrModel from "../../models/categoria/categoriaTrModel.mjs";

const addCategoriaTr = (req, res) => {
    const { nome, tipo, cor } = req.body;
    const cod_casal = req.header('auth');

    CategoriaTrModel.addCategoriaTr(nome, tipo, cor, cod_casal, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar categoria', err);
            return res.status(500).json({ error: 'Erro ao cadastrar categoria' });
        }

        res.status(200).json({ messagem: 'Categoria Cadastrada com Sucesso', results })
    })
}

const loadCategoriaTr = (req, res) => {
    const auth = req.header('auth');
    const tipo = req.header('tipo')

    CategoriaTrModel.loadCategoriaTr(auth, tipo, (err, results) => {
        if (err) {
            console.error('Não foi possível encontrar as categorias', err);
            return res.status(500).json({ error: 'Não possível encontrar as categorias', results })
        }

        res.status(200).json({ messagem: 'Categoria Encontradas com Sucesso', results })
    })
}

const loadCategoriaTrID = (req, res) => {
    const auth = req.header('auth');
    const { id } = req.body;

    CategoriaTrModel.loadCategoriaTrID(auth, id, (err, results) => {
        if (err) {
            console.error('Não foi possível carregar a categoria em questão', err);
            return res.status(500).json({ error: 'Não foi possível carregar a categoria em questão', results })
        }

        res.status(200).json({ messagem: 'Categoria Encontrada com Sucesso', results })
    })
}

const editCategoriaTr = (req, res) => {
    const auth = req.header('auth');
    const {id, nome, tipo, cor } = req.body;

    CategoriaTrModel.editCategoriaTr(auth, id, nome, tipo, cor, (err, results) => {
        if (err) {
            console.error('Não foi possível editar essa Categoria', err);
            return res.status(500).json({ error: 'Não foi possível editar essa Categoria', results })
        }

        res.status(200).json({ messagem: 'Categoria Editada com Sucesso', results })
    })
}

const deleteCategoriaTr = (req, res) => {
    const auth = req.header('auth');
    const {id} = req.body;

    CategoriaTrModel.deleteCategoriaTr(auth, id, (err, results) => {
        if(err) {
            console.error('Não foi possível exculir essa categoria', err);
            return res.status(500).json({error: 'Não foi possível exculir essa categoria', results})
        }

        res.status(200).json({ messagem: 'Categoria Excluida com Sucesso', results })
    })
}

export default { addCategoriaTr, loadCategoriaTr, loadCategoriaTrID, editCategoriaTr, deleteCategoriaTr }