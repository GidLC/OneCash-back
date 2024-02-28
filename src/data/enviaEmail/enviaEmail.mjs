import nodemailer from 'nodemailer';
import { adminMail, adminPass, mailHost, mailPort } from '../emailConfig.mjs';

const enviaEmail = async(destinatario, assunto, conteudo) => {
    try {
        const transpoter = nodemailer.createTransport({
            host: mailHost,
            port: mailPort,
            secure: false,
            auth: {
                user: adminMail,
                pass: adminPass
            }
        })

        const options = {
            from: adminMail,
            to: destinatario,
            subject: assunto,
            html: conteudo
        }

        return transpoter.sendMail(options)
    } catch(error) {
        return `Houve um erro no envio do e-mail, ${error}`
    }
}

export default enviaEmail
