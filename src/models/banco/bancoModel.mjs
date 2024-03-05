import { connection } from "../../config.mjs";


class BancoModel {
    static addBanco = (saldo_inicial, casal, nome, tipo, usuario, callback) => {
        if (tipo == 1) {
            const query = 'INSERT INTO banco (nome, tipo, saldo_inicial, casal, usuario) VALUES (?,?,?,?,?)';
            connection.query(query, [nome, tipo, saldo_inicial, casal, usuario], (err, results) => {
                if (err) {
                    return callback(err, null)
                }

                return callback(null, results)
            })
        } else {
            const query = 'INSERT INTO banco (nome, tipo, saldo_inicial, casal) VALUES (?,?,?,?)';
            connection.query(query, [nome, tipo, saldo_inicial, casal], (err, results) => {
                if (err) {
                    return callback(err, null)
                }

                return callback(null, results)
            })
        }

    }

    static readBanco = (cod_casal, callback) => {
        const query = 'SELECT * FROM banco where casal = ?';
        connection.query(query, [cod_casal], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        });
    }

    static updateBanco = (saldo_inicial, casal, nome, tipo, callback) => {

    }

    static saldoBanco = async (casal, callback) => {
        try {
            const queryBanco = 'SELECT * FROM banco WHERE casal = ?';
            const bancosBD = await new Promise((resolve, reject) => {
                connection.query(queryBanco, [casal], (err, results) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                });
            });

            const bancosComSaldo = await Promise.all(bancosBD.map(async (banco) => {
                const saldoInicialBD = await new Promise((resolve, reject) => {
                    const querysaldoInicial = 'SELECT saldo_inicial FROM banco WHERE id = ? AND casal = ?';
                    connection.query(querysaldoInicial, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const saldoInicial = saldoInicialBD[0].saldo_inicial;

                const queryreceitas = 'SELECT SUM(valor) AS total_receitas FROM receita WHERE banco = ? AND casal = ?';
                const receitasBD = await new Promise((resolve, reject) => {
                    connection.query(queryreceitas, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const receitas = receitasBD[0].total_receitas || 0;

                const queryDespesas = 'SELECT SUM(valor) AS total_despesas FROM despesa_col WHERE banco = ? AND casal = ?';
                const despesasBD = await new Promise((resolve, reject) => {
                    connection.query(queryDespesas, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const despesas = despesasBD[0].total_despesas || 0;

                const saldo = saldoInicial + receitas - despesas;

                return { ...banco, saldo, saldoInicial };
            }));

            return callback(null, bancosComSaldo);
        } catch (error) {
            console.error(`Não foi possível gerar o saldo ${error}`);
            return callback(error, null);
        }
    }

}

export default BancoModel