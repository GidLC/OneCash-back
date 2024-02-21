import BancoModel from "../../models/banco/bancoModel.mjs";

const addBanco = (req, res) => {
    console.log(req.body)
    const {saldo_inicial, casal_banco, nome_banco, tipo_banco} = req.body;
    BancoModel.addBanco(saldo_inicial, casal_banco, nome_banco, tipo_banco, (err, results) => {
        if(err) {
            console.error('Erro ao cadastrar banco', err);
            return res.status(500).json({error: 'Erro ao cadastrar banco'});
        }

        res.status(200).json({ message: 'Banco cadastrado com sucesso', results });
    });
};

const readBanco = (req, res) => {
    const cod_casal = req.header('auth');
    BancoModel.readBanco(cod_casal, (err, results) => {
        if(err) {
            return res.status(500).json({error: 'Erro ao encontrar bancos'});
        }

        res.status(200).json({message: 'Bancos encontrados', results});
    });
};

const saldoBanco = (req, res) => {
    const casal = req.header('auth');

    BancoModel.saldoBanco(casal, (err, results) => {
        if(err) {
            return res.status(500).json({error: 'Erro ao encontrar o saldo do banco'});
        }

        res.status(200).json({message: 'Saldo encontrado', results});
    })
}


export default {addBanco, readBanco, saldoBanco}