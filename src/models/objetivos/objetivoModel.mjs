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

    static readObjetivos = (casal, status, callback) => {
        const query = `SELECT obj.id, obj.descricao, obj.valor_final, obj.valor_inicial, obj.status, obj.prazo, c.codigo AS cod_cor, ic.ion_nome AS icone FROM objetivo AS obj
                        INNER JOIN cor AS c ON obj.cor = c.id 
                        INNER JOIN icones AS ic ON obj.icone = ic.id
                            WHERE casal = ? AND status = ?`;

        connection.query(query, [casal, status], (err, results) => {
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

    static readObjetivoID = (id, casal, callback) => {
        const query = 'SELECT id, descricao, valor_final, valor_inicial, prazo'
    }

    static aporteValor = (id, valor, callback) => {
        const query = 'INSERT INTO aporte_objetivo (valor, objetivo) VALUES (?,?)'

        connection.query(query, [valor, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            return callback(null, results)
        })
    }
}

export default ObjetivoModel