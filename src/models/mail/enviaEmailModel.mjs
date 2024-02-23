import nodemailer from 'nodemailer'

const adminMail = "dionisio_roberval@hotmail.com"
const adminPass = "Didi@@123"
const mailHost = "smtp-mail.outlook.com"
const mailPort = 587

const enviaEmail = async (destinatiario, assunto, conteudo) => {
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
        from: "teste@onecash.com.br",
        to: destinatiario,
        subject: assunto,
        html: conteudo
    }

    return transpoter.sendMail(options)
}

export default {enviaEmail}