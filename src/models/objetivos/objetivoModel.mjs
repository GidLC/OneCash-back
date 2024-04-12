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
}

export default ObjetivoModel