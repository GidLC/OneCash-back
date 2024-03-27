import { connection } from "../../config.mjs";

class SaldosModel {
    static saldoGeral = async (casal, usuario, callback) => {
        try {
            //Saldos individuais
            //seleciona todos os bancos
            const queryBancoInd = 'SELECT * FROM banco WHERE casal = ? AND usuario = ? AND tipo = 0';
            const bancosBDInd = await new Promise((resolve, reject) => {
                connection.query(queryBancoInd, [casal, usuario], (err, results) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                });
            });

            //Busca informações dos bancos
            const bancosComSaldoInd = await Promise.all(bancosBDInd.map(async (banco) => {
                const saldoInicialBD = await new Promise((resolve, reject) => {
                    const querysaldoInicial = 'SELECT saldo_inicial FROM banco WHERE id = ? AND casal = ? AND usuario = ? AND tipo = 0';
                    connection.query(querysaldoInicial, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const saldoInicial = saldoInicialBD[0].saldo_inicial;

                const queryreceitas = 'SELECT SUM(valor) AS total_receitas FROM receita WHERE banco = ? AND casal = ? AND usuario = ? AND tipo = 0';
                const receitasBD = await new Promise((resolve, reject) => {
                    connection.query(queryreceitas, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const receitas = receitasBD[0].total_receitas || 0;

                const queryDespesas = 'SELECT SUM(valor) AS total_despesas FROM despesa WHERE banco = ? AND casal = ? AND usuario = ? AND tipo = 0';
                const despesasBD = await new Promise((resolve, reject) => {
                    connection.query(queryDespesas, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const despesas = despesasBD[0].total_despesas || 0;

                const saldo = saldoInicial + receitas - despesas;

                return { ...banco, saldo};
            }));

            //Saldos conjuntos
            const queryBancoCol = 'SELECT * FROM banco WHERE casal = ? AND tipo = 1';
            const bancosBDCol = await new Promise((resolve, reject) => {
                connection.query(queryBancoCol, [casal], (err, results) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                });
            });

            const bancosComSaldoCol = await Promise.all(bancosBDCol.map(async (banco) => {
                const saldoInicialBD = await new Promise((resolve, reject) => {
                    const querysaldoInicial = 'SELECT saldo_inicial FROM banco WHERE id = ? AND casal = ? AND tipo = 1';
                    connection.query(querysaldoInicial, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const saldoInicial = saldoInicialBD[0].saldo_inicial;

                const queryreceitas = 'SELECT SUM(valor) AS total_receitas FROM receita WHERE banco = ? AND casal = ? AND tipo = 1';
                const receitasBD = await new Promise((resolve, reject) => {
                    connection.query(queryreceitas, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const receitas = receitasBD[0].total_receitas || 0;

                const queryDespesas = 'SELECT SUM(valor) AS total_despesas FROM despesa WHERE banco = ? AND casal = ? AND tipo = 1';
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

                return { ...banco, saldo };
            }));

            const saldoIndividual = bancosComSaldoInd.reduce((acumulador, banco) => acumulador + banco.saldo, 0)
            const saldoColetivo = bancosComSaldoCol.reduce((acumulador, banco) => acumulador + banco.saldo, 0)

            return callback(null, {saldoIndividual, saldoColetivo});
        } catch (error) {
            console.error(`Não foi possível gerar o saldo ${error}`);
            return callback(error, null);
        }
    }
}

export default SaldosModel