import enviaEmailModel from "../../models/mail/enviaEmailModel.mjs";

const enviaEmail = async (req, res) => {
    try{
        const {destinatario, assunto, conteudo} = req.body

        await enviaEmailModel.enviaEmail(destinatario, assunto, conteudo, (err, results) => {
            if(err) {
                return res.status(500).json({error: 'Não foi possível enviar o e-mail em questão'});
            }

            res.status(200).json({message: 'E-mail enviado com sucesso', results})
        })
    } catch (error) {

    }
}

export default {enviaEmail}