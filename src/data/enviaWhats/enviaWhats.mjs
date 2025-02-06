import { apiWhatsURL } from "../emailConfig.mjs";

//Função acessa API externa para envio de whatsapp
const enviaWhats = async (num, msg) => {
    try {
        const response = await fetch(`${apiWhatsURL}/enviaWhats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                num,
                msg
            },
        });
    
        return response.json();
    } catch (error) {
        throw error
    }
};

export default enviaWhats;