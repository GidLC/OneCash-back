import SaldosModel from "../../models/saldos/saldosModel.mjs";

const saldoGeral = (req, res) => {
    const casal = req.header('auth');
    const usuario = req.header('usuario');

    SaldosModel.saldoGeral(casal, usuario, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao encontrar os saldos' });
        }

        res.status(200).json({ message: 'Saldos encontrado', results });
    })
}

export default {saldoGeral}