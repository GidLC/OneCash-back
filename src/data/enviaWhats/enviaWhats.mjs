import { sendMessage } from "../../app.mjs";

const enviaWhats = async (num, msg) => {
  try {
    const response = await sendMessage(num, msg)
    return `Mensagem enviada com sucesso: ${response}`;
  } catch (error) {
    return `Erro ao enviar a mensagem: ${error}`;
  }
};

export default enviaWhats;
