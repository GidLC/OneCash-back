import nodemailer from 'nodemailer'

const adminMail = "dionisio_roberval@hotmail.com"
const adminPass = "Didi@@123"
const mailHost = "smtp-mail.outlook.com"
const mailPort = 587

class enviaEmailModel {
    static enviaEmail = async (destinatario, assunto, conteudo, callback) => {
        console.log(destinatario)
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
    
            return callback(null, transpoter.sendMail(options))
        } catch (error) {
            return callback(`Houve um erro no envio do e-mail, ${error}`, null)
        }
    }
}

export default enviaEmailModel