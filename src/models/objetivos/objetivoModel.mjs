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

    static readObjetivos = async (casal, status, callback) => {
        try {
            const queryObjs = `SELECT obj.id, obj.descricao, obj.valor_final, obj.valor_inicial, obj.status, obj.prazo, c.codigo AS cod_cor, ic.ion_nome AS icone FROM objetivo AS obj
            INNER JOIN cor AS c ON obj.cor = c.id 
            INNER JOIN icones AS ic ON obj.icone = ic.id
                WHERE casal = ? AND status = ?`;

            const objs = await new Promise((resolve, reject) => {
                connection.query(queryObjs, [casal, status], (err, results) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                })
            })

            const objetivos = await Promise.all(objs.map(async (objetivo) => {
                const valorAportes = await new Promise((resolve, reject) => {
                    const queryAportes = 'SELECT SUM(valor) as valor FROM aporte_objetivo WHERE objetivo = ?'
                    connection.query(queryAportes, [objetivo.id], (err, results) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(results)
                    })
                })

                const valorAtual = valorAportes[0].valor + objetivo.valor_inicial
                return { ...objetivo, valorAtual }
            }))

            callback(null, objetivos)
        } catch (error) {
            callback(error, null)
        }
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

    static aporteValor = (objetivoId, valor, casal, callback) => {
        const query = 'INSERT INTO aporte_objetivo (valor, objetivo, casal) VALUES (?,?,?)'

        connection.query(query, [valor, objetivoId, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            return callback(null, results)
        })
    }

    static readAportes = (objetivoId, casal, callback) => {
        const query = 'SELECT id, valor, data FROM aporte_objetivo WHERE objetivo = ? AND casal = ?'

        connection.query(query, [objetivoId, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            return callback(null, results)
        })
    }

    static mudaStatusObjetivo = (objetivoId, casal, status, callback) => {
        const query = 'UPDATE objetivo SET status = ? WHERE id = ? AND casal = ?'

        connection.query(query, [status, objetivoId, casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            return callback(null, results)
        })
    }
}

export default ObjetivoModel