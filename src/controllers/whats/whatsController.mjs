import whatsModel from "../../models/whats/whatsModel.mjs";

const enviaWhats = (req, res) => {
    const num = req.header('num')
    const msg = req.header('msg')

    whatsModel.enviaWhats(num, msg, (err, results) => {
        if (err) {
            return res.status(500).json({error: "Erro no envio da mensagem via Whatsapp"})
        }

        res.status(200).json({message: 'OK', results})
    })
}

export default {enviaWhats}