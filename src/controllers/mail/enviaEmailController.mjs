import enviaEmail from "../../models/mail/enviaEmailModel.mjs";

const enviaEmail = async (req, res) => {
    try{
        const {destinatiario, assunto, conteudo} = req.body

        await enviaEmail
    } catch (error) {

    }
}