import { connection } from "../../config.mjs";

class ObjetivoModel {
    static addObjetivo = (descricao, valor_final, valor_inicial, status, prazo, casal, cor, icone, callback) => {
        const query = 'INSERT INTO objetivo (descricao, valor_final, valor_inicial, status, prazo, casal, cor, icone) VALUES (?,?,?,?,?,?,?,?)'

        connection.query(query, [descricao, valor_final, valor_inicial, status, prazo, casal, cor, icone], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static readObjetivos = (casal, callback) => {
        const query = 'SELECT * FROM objetivo WHERE casal = ?';

        connection.query(query, [casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteObjetivo = (id, casal, callback) => {
        const query = 'DELETE FROM objetivo WHERE id = ? AND casal = ?';

        connection.query(query, [id, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }
}

export default ObjetivoModel