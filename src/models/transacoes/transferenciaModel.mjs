import { connection } from "../../config.mjs";
import SeparaData from "../../data/SeparaData/SeparaData.mjs";

class TransfModel {
    static addTransferencia = async (casal, valor, usuario, data, bancoOrigem, bancoDestino, callback) => {
        try {
            const objData = await SeparaData(data)
            //No banco de origem se cria uma despesa(débito 0)
            const debitoTr = await new Promise((resolve, reject) => {
                const queryDebito = 'INSERT INTO transferencias(descricao, valor, usuario, casal, dia, mes, ano, banco, tipo) VALUES (?,?,?,?,?,?,?,?,?)';
                connection.query(queryDebito, ['Transferência saída', valor, usuario, casal, objData.dia, objData.mes, objData.ano, bancoOrigem, 0], (err, results) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                })
            })

            //No banco destino se cria uma receita(crédito 1)
            const creditoTr = await new Promise((resolve, reject) => {
                const queryCredito = 'INSERT INTO transferencias(descricao, valor, usuario, casal, dia, mes, ano, banco, tipo) VALUES (?,?,?,?,?,?,?,?,?)';
                connection.query(queryCredito, ['Transferência entrada', valor, usuario, casal, objData.dia, objData.mes, objData.ano, bancoDestino, 1], (err, results) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                })
            })

            callback(null, 'OK')
        } catch (error) {
            console.error(`Não foi possível realizar a transferência ${error}`);
            return callback(error, null);
        }
    }

}

export default TransfModel