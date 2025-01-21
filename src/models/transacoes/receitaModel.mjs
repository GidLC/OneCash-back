import { pool } from "../../config.mjs";
import SeparaData from "../../data/SeparaData/SeparaData.mjs";

class ReceitaModel {

    static addReceita = async (descricao, valor, usuario, cod_casal, categoria, status, data, banco, tipo, fixa, callback) => {
        try {
            const query = 'INSERT INTO receita (descricao, valor, usuario, casal, categoria, status, dia, mes, ano, banco, tipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
            const objData = await SeparaData(data)
            pool.query(query, [descricao, valor, usuario, cod_casal, categoria, status, objData.dia, objData.mes, objData.ano, banco, tipo], (err, results) => {
                if (err) {
                    return callback(err, null)
                }
                return callback(null, results)
            })
        } catch (error) {

        }
    }

    static readReceita = async (usuario, casal, mes, ano, callback) => {
        const queryInd = `SELECT rec.id, rec.descricao, rec.valor, rec.dia, rec.mes, rec.ano, rec.status, cat.nome AS nome_categoria, 
                       ic.ion_nome AS nome_icone, cor.codigo AS cod_cor, ba.nome AS nome_banco, cat.tipo AS tipo_categoria FROM receita as rec
                        INNER JOIN categoria_tr AS cat ON cat.id = rec.categoria
                        INNER JOIN icones AS ic ON ic.id = cat.icone
                        INNER JOIN cor ON cor.id = cat.cor
                        INNER JOIN banco AS ba ON ba.id = rec.banco
                            WHERE rec.usuario = ? AND rec.casal = ? AND rec.mes = ? AND rec.ano = ? AND rec.tipo = 0`

        //Receitas individuais
        const receitasInd = await new Promise((resolve, reject) => {
            pool.query(queryInd, [usuario, casal, mes, ano], (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })

        const queryCol = `SELECT rec.id, rec.descricao, rec.valor, rec.dia, rec.mes, rec.ano, rec.status, cat.nome AS nome_categoria, 
                            ic.ion_nome AS nome_icone, cor.codigo AS cod_cor, ba.nome AS nome_banco, cat.tipo AS tipo_categoria FROM receita as rec
                                INNER JOIN categoria_tr AS cat ON cat.id = rec.categoria
                                INNER JOIN icones AS ic ON ic.id = cat.icone
                                INNER JOIN cor ON cor.id = cat.cor
                                INNER JOIN banco AS ba ON ba.id = rec.banco
                                    WHERE rec.casal = ? AND rec.mes = ? AND rec.ano = ? AND rec.tipo = 1`
        //Entende-se receitas coletivas como os ajustes de saldo dos bancos coletivos
        const receitasCol = await new Promise((resolve, reject) => {
            pool.query(queryCol, [casal, mes, ano], (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })

        const receitas = [...receitasInd, ...receitasCol]
        return callback(null, receitas)
    }

    static readReceitaID = async (id, usuario, casal, callback) => {
        const query = `SELECT rec.id, rec.descricao, rec.valor, rec.tipo, rec.dia, rec.mes, rec.ano, rec.status, cat.id AS id_categoria, ba.id AS id_banco FROM receita as rec
                        INNER JOIN categoria_tr AS cat ON cat.id = rec.categoria
                        INNER JOIN banco AS ba ON ba.id = rec.banco
                             WHERE rec.id = ? AND rec.usuario = ? AND rec.casal = ?`;

        pool.query(query, [id, usuario, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results[0])
        })
    }

    static editReceita = async (casal, usuario, tipo, id, descricao, categoria, valor, data, status, callback) => {
        const query = `UPDATE receita SET descricao = ?, categoria = ?, valor = ?, tipo = ?, dia = ?, mes = ?, ano = ?, status = ? WHERE casal = ? AND id = ?`
        const objData = await SeparaData(data)
        pool.query(query, [descricao, categoria, valor, tipo, objData.dia, objData.mes, objData.ano, status, casal, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteReceita = async (id, usuario, casal, callback) => {
        const query = 'DELETE FROM receita WHERE id = ? AND usuario = ? AND casal = ?';

        pool.query(query, [id, usuario, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static efetivaReceita = async (casal, receitaId, callback) => {
        const query = 'UPDATE receita SET status = 1 WHERE casal = ? AND id = ?';

        pool.query(query, [casal, receitaId], (err, results) => {
            if (err) {
                return callback(err, null);
            }

            return callback(null, results);
        })
    }

}

export default ReceitaModel