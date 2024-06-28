import { Client } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal';


const numero = "+554396622714"
const mensagem = "Sim, isso mesmo agora vou conseguir mandar mensagem de whatsapp pelo meu aplicativo e não posso deixar de aproveitar para dizer o quanto te amo."
const chatId = numero.substring(1) + "@c.us"

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath:
            "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
});

client.on('ready', () => {
    console.log('Client is ready!')
    client.sendMessage(chatId, mensagem).then(response => {
        console.log('Mensagem enviada com sucesso:', response);
    }).catch(error => {
        console.error('Erro ao enviar a mensagem:', error);
    });
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.initialize();
