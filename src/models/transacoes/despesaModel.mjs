import { pool } from "../../config.mjs";
import SeparaData from '../../data/SeparaData/SeparaData.mjs';

class DespesaModel {
    static addDespesa = async (descricao, valor, usuario, cod_casal, categoria, status, data, banco, tipo, callback) => {
        console.log({ descricao, valor, usuario, cod_casal, categoria, status, tipo, data, banco })
        const query = 'INSERT INTO despesa(descricao, valor, usuario, casal, categoria, status, dia, mes, ano, banco, tipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        const objData = await SeparaData(data)
        pool.query(query, [descricao, valor, usuario, cod_casal, categoria, status, objData.dia, objData.mes, objData.ano, banco, tipo], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static readDespesa = async (usuario, casal, mes, ano, tipo, callback) => {
        if (tipo == 0) {
            console.log({ usuario, casal, mes, ano, tipo })
            const query = `SELECT des.id, des.descricao, des.valor, des.dia, des.mes, des.ano, cat.nome AS nome_categoria, 
            ic.ion_nome AS nome_icone, cor.codigo AS cod_cor, ba.nome AS nome_banco, cat.tipo AS tipo_categoria FROM despesa as des
                INNER JOIN categoria_tr AS cat ON cat.id = des.categoria
                INNER JOIN icones AS ic ON ic.id = cat.icone
                INNER JOIN cor ON cor.id = cat.cor
                INNER JOIN banco AS ba ON ba.id = des.banco
                    WHERE des.usuario = ? AND des.casal = ? AND des.mes = ? AND des.ano = ? AND des.tipo = ?`;

            pool.query(query, [usuario, casal, mes, ano, tipo], (err, results) => {
                if (err) {
                    return callback(err, null)
                }

                return callback(null, results)
            })
        } else if (tipo == 1) {
            console.log({ casal, mes, ano, tipo })
            const query = `SELECT des.id, des.descricao, des.valor, des.dia, des.mes, des.ano, cat.nome AS nome_categoria, 
            ic.ion_nome AS nome_icone, cor.codigo AS cod_cor, ba.nome AS nome_banco, cat.tipo AS tipo_categoria FROM despesa as des
                INNER JOIN categoria_tr AS cat ON cat.id = des.categoria
                INNER JOIN icones AS ic ON ic.id = cat.icone
                INNER JOIN cor ON cor.id = cat.cor
                INNER JOIN banco AS ba ON ba.id = des.banco
                    WHERE des.casal = ? AND des.mes = ? AND des.ano = ? AND des.tipo = ?`;

            pool.query(query, [casal, mes, ano, tipo], (err, results) => {
                if (err) {
                    return callback(err, null)
                }

                return callback(null, results)
            })
        }

    }

    static readDespesaID = async (id, casal, callback) => {
        const query = `SELECT des.id, des.descricao, des.valor, des.tipo, des.dia, des.mes, des.ano, cat.id AS id_categoria, cat.nome AS nome_categoria, 
                        ba.id AS id_banco, ba.nome AS nome_banco FROM despesa AS des
                            INNER JOIN categoria_tr AS cat ON cat.id = des.categoria
                            INNER JOIN banco AS ba ON ba.id = des.banco
                                WHERE des.id = ? AND des.casal = ?`;

        pool.query(query, [id, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results[0])
        })
    }

    static editDespesa = async (casal, id, descricao, categoria, valor, data, callback) => {
        const query = `UPDATE despesa SET descricao = ?, categoria = ?, valor =?, dia = ?, mes = ?, ano = ? WHERE casal = ? AND id = ?`
        const objData = await SeparaData(data)
        console.log(casal, id, descricao, categoria, valor, objData)
        pool.query(query, [descricao, categoria, valor, objData.dia, objData.mes, objData.ano, casal, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteDespesa = async (casal, id, callback) => {
        const query = 'DELETE FROM despesa WHERE casal = ? AND id = ?';

        pool.query(query, [casal, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }
}

export default DespesaModel