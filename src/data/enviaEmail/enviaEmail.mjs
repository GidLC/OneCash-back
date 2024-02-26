import nodemailer from 'nodemailer';

const adminMail = "dionisio_roberval@hotmail.com"
const adminPass = "Didi@@123"
const mailHost = "smtp-mail.outlook.com"
const mailPort = 587

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
