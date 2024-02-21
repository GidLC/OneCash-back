import { connection } from "../../config.mjs";

class CategoriaTrModel {
    static addCategoriaTr = (nome, tipo, cor, casal, callback) => {
        const query = 'INSERT INTO categoria_tr (nome, tipo, cor, casal) VALUES (?,?,?,?)';
        connection.query(query, [nome, tipo, cor, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static loadCategoriaTr = (auth, tipo, callback) => {
        const query = 'SELECT * FROM categoria_tr WHERE casal = ? AND tipo = ?';
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

            return callback(null, results)
        })
    }

    static editCategoriaTr = (auth, tipo, nome, cor, callback) => {
        const query = 'UPDATE categoria_tr SET nome = ?, tipo = ?, cor = ? WHERE casal = ? AND id = ?'
        connection.query(query, [nome, tipo, cor, auth, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteCategoriaTr = (auth, id_categoria, callback) => {
        const query = 'DELETE FROM categoria_tr WHERE id = ? AND casal = ?';
        connection.query(query, [id_categoria, auth], (err, results) => {
            if (err) {
                return callback(err, null)
            } //Se a categoria tiver movimentações a mesma não pode ser excluida

            return callback(null, results)
        })
    }
}

export default CategoriaTrModel