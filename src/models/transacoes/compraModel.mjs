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
            extrairDados(html);
        } catch (error) {
            console.error(`Ocorreu um erro: ${error}`);
            return null;
        }

        async function extrairDados(html) {
            const $ = cheerio.load(html);
            const itens = [];

            // Extrai informações gerais da nota
            const cnpjTexto = $('div#conteudo div.text').text().trim();
            const totalNota = $('div#conteudo div#totalNota span.totalNumb.txtMax').text().trim();

            const regexCNPJ = /(?:\bCNPJ:\s*)?(\d{2})\.?(\d{3})\.?(\d{3})\/?(\d{4})-?(\d{2})/;
            const matchCNPJ = cnpjTexto.match(regexCNPJ);
            const cnpj = matchCNPJ.slice(1, 6).join('')

            const buscaFantasia = async (cnpj) => {
                if (cnpj) {
                    try {
                        const responseEstabelecimento = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
                            method: 'GET',
                            'Content-Type': 'application/json',
                        });

                        if (!responseEstabelecimento.ok) {
                            throw new Error(`Falha ao buscar dados na Receita: ${responseEstabelecimento.status}`);
                        }

                        return responseEstabelecimento.json();
                    } catch (error) {
                        console.error("Erro ao buscar dados na receita:", error);
                    }
                }
            }

            const estabelecimento = await buscaFantasia(cnpj)

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
                Estabelecimento: estabelecimento.fantasia,
                cnpj: cnpj,
                TotalNota: totalNota,
                Itens: itens,
            };

            //console.log(dadosNota)
            callback(null, dadosNota)
        }
    }

}

export default compraModel