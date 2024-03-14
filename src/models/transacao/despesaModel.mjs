import { connection } from '../../config.mjs'
import SeparaData from '../../data/SeparaData/SeparaData.mjs';

class DespesaModel {
    static addDespesa = async (descricao, valor, usuario, cod_casal, categoria, status, data, banco, callback) => {
        const query = 'INSERT INTO despesa(descricao, valor, casal, categoria, status, dia, mes, ano, banco) VALUES (?,?,?,?,?,?,?,?,?)';
        const objData = await SeparaData(data)
        connection.query(query, [descricao, valor, cod_casal, categoria, status, objData.dia, objData.mes, objData.ano, banco], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static readDespesa = async (usuario, casal, mes, ano, callback) => {
        const query = `SELECT des.id, des.descricao, des.valor, cat.nome AS nome_categoria, 
                        ic.ion_nome AS nome_icone, cor.codigo AS cod_cor, ba.nome AS nome_banco FROM despesa as des
                            INNER JOIN categoria_tr AS cat ON cat.id = des.categoria
                            INNER JOIN icones AS ic ON ic.id = cat.icone
                            INNER JOIN cor ON cor.id = cat.cor
                            INNER JOIN banco AS ba ON ba.id = des.banco
                                WHERE des.usuario = ? AND des.casal = ? AND des.mes = ? AND des.ano = ?`;

        connection.query(query, [usuario, casal, mes, ano], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static readDespesaID = async (id, usuario, casal, callback) => {
        const query = `SELECT des.id, des.descricao, des.valor, des.tipo, cat.id AS id_categoria, cat.nome AS nome_categoria, 
                        ba.id AS id_banco, ba.nome AS nome_banco FROM despesa AS des
                            INNER JOIN categoria_tr AS cat ON cat.id = des.categoria
                            INNER JOIN banco AS ba ON ba.id = des.banco
                                WHERE des.id = ? AND des.usuario = ? AND des.casal = ?`;

        connection.query(query, [id, usuario, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results[0])
        })
    }

    static editReceita = async (casal, usuario, id, descricao, categoria, valor, dia, mes, ano, callback) => {
        const query = `UPDATE despesa SET descricao = ?, categoria = ?, valor =?, dia = ?, mes = ?, ano = ? WHERE casal = ? AND usuario = ? AND id = ?`

        connection.query(query, [descricao, categoria, valor, dia, mes, ano, casal, usuario, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteDespesa = async (casal, usuario, id, callback) => {
        const query = 'DELETE FROM despesa WHERE casal = ? AND usuario = ? AND id = ?';

        connection.query(query, [casal, usuario, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }
}

export default DespesaModel