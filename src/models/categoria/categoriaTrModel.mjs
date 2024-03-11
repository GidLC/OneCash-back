import { connection } from "../../config.mjs";

class CategoriaTrModel {
    static addCategoriaTr = (nome, tipo, cor, icone, casal, callback) => {
        const query = 'INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES (?,?,?,?,?)';
        connection.query(query, [nome, tipo, cor, icone, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static loadCategoriaTr = (auth, tipo, callback) => {
        const query = `SELECT cat.id, cat.nome, c.codigo AS cod_cor, ic.ion_nome AS icone FROM categoria_tr AS cat 
                        INNER JOIN cor AS c ON cat.cor = c.id 
                        INNER JOIN icones AS ic ON cat.icone = ic.id
                            WHERE casal = ? AND tipo = ?`
        connection.query(query, [auth, tipo], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            return callback(null, results)
        })
    }

    static loadCategoriaTrID = (auth, id, callback) => {
        const query = 'SELECT * FROM categoria_tr where casal = ? AND id = ?';
        connection.query(query, [auth, id], (err, results) => {
            if (err) {
                return callback(err, null)
            } else if (results.length == 0) {
                return callback("Nenhum registro foi encontrado", null)
            }
            console.log(results)

            return callback(null, results[0])
        })
    }

    static editCategoriaTr = (auth, id, nome, icone, cor, callback) => {
        console.log(auth, id, nome, icone, cor)
        const query = 'UPDATE categoria_tr SET nome = ?, cor = ?, icone = ? WHERE casal = ? AND id = ?'
        connection.query(query, [nome, cor, icone, auth, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteCategoriaTr = (auth, id, callback) => {
        console.log(`Auth: ${auth}, id: ${id}`)
        const query = 'DELETE FROM categoria_tr WHERE id = ? AND casal = ?';
        connection.query(query, [id, auth], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }
}

export default CategoriaTrModel