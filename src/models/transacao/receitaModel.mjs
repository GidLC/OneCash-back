import { connection } from "../../config.mjs"
import SeparaData from "../../data/SeparaData/SeparaData.mjs";

class ReceitaModel {

    static addReceita = async (descricao, valor, usuario, cod_casal, categoria, status, data, banco, callback) => {
        console.log({descricao, valor, usuario, cod_casal, categoria, status, data, banco})
        const query = 'INSERT INTO receita (descricao, valor, usuario, casal, categoria, status, dia, mes, ano, banco) VALUES (?,?,?,?,?,?,?,?,?,?)';
        const objData = await SeparaData(data)
        connection.query(query, [descricao, valor, usuario, cod_casal, categoria, status, objData.dia, objData.mes, objData.ano, banco], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            return callback(null, results)
        })
    }

    static readReceita = async (usuario, casal, mes, ano, callback) => {
        const query = `SELECT rec.id, rec.descricao, rec.valor, cat.nome AS nome_categoria, 
                       ic.ion_nome AS nome_icone, cor.codigo AS cod_cor, ba.nome AS nome_banco FROM receita as rec
                        INNER JOIN categoria_tr AS cat ON cat.id = rec.categoria
                        INNER JOIN icones AS ic ON ic.id = cat.icone
                        INNER JOIN cor ON cor.id = cat.cor
                        INNER JOIN banco AS ba ON ba.id = rec.banco
                            WHERE rec.usuario = ? AND rec.casal = ? AND rec.mes = ? AND rec.ano = ?`;

        connection.query(query, [usuario, casal, mes, ano], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            console.log(results)
            return callback(null, results)
        })
    }

    static readReceitaID = async (id, usuario, casal, callback) => {
        console.log(id, usuario, casal)
        const query = `SELECT rec.id, rec.descricao, rec.valor, rec.tipo, rec.dia, rec.mes, rec.ano, cat.id AS id_categoria, ba.id AS id_banco FROM receita as rec
                        INNER JOIN categoria_tr AS cat ON cat.id = rec.categoria
                        INNER JOIN banco AS ba ON ba.id = rec.banco
                             WHERE rec.id = ? AND rec.usuario = ? AND rec.casal = ?`;

        connection.query(query, [id, usuario, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results[0])
        })
    }

    static editReceita = async (casal, usuario, id, descricao, categoria, valor, dia, mes, ano, callback) => {
        const query = `UPDATE receita SET descricao = ?, categoria = ?, valor =?, dia = ?, mes = ?, ano = ? WHERE casal = ? AND usuario = ? AND id = ?`

        connection.query(query, [descricao, categoria, valor, dia, mes, ano, casal, usuario, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteReceita = async (id, usuario, casal, callback) => {
        const query = 'DELETE FROM receita WHERE id = ? AND usuario = ? AND casal = ?';

        connection.query(query, [id, usuario, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

}

export default ReceitaModel