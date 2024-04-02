import { connection } from "../../config.mjs";
import cheerio from 'cheerio';

class compraModel {

    static buscaNF = async (url, callback) => {
        const urlRecebida = url;

        try {
            const response = await fetch(urlRecebida);

            if (!response.ok) {
                callback(`A solicitação falhou com status ${response.status}`, null);
            }

            const html = await response.text();
            //console.log(html); // Aqui você tem o HTML da página
            extrairDados(html);
        } catch (error) {
            console.error(`Ocorreu um erro: ${error}`);
            return null;
        }

        function extrairDados(html) {
            const $ = cheerio.load(html);
            const itens = [];

            // Extrai informações gerais da nota
            const estabelecimento = $('div#conteudo div.txtCenter div#u20').text().trim();
            const totalNota = $('div#conteudo div#totalNota span.totalNumb.txtMax').text().trim();

            // Extrai informações de cada item da nota
            $('table#tabResult tr[id^="Item"]').each((index, element) => {
                const nome = $(element).find('span.txtTit2').text().trim();
                const quantidade = $(element).find('span.Rqtd').text().replace('Qtde.:', '').trim();
                const valor_unitario = $(element).find('span.RvlUnit').text().replace('Vl. Unit.:', '').trim();
                const valor_total = $(element).find('td.txtTit3.noWrap span.valor').text().trim();

                itens.push({
                    nome,
                    quantidade: parseFloat(quantidade.replace(',', '.')),
                    valor_unitario: parseFloat(valor_unitario.replace(',', '.')),
                    valor_total,
                });
            });

            // Cria o objeto JSON com os dados extraídos
            const dadosNota = {
                Estabelecimento: estabelecimento,
                TotalNota: totalNota,
                Itens: itens,
            };

            console.log(dadosNota)
            callback(null, dadosNota)
        }
    }

}

export default compraModel