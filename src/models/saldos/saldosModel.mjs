import { connection } from "../../config.mjs";

class SaldosModel {
    static saldoGeral = async (casal, usuario, callback) => {
        try {
            //Saldos individuais
            //seleciona todos os bancos
            const queryBancoInd = 'SELECT * FROM banco WHERE casal = ? AND usuario = ? AND tipo = 0 AND arquivo = 0';
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
                //Saldo inicial
                const saldoInicialBD = await new Promise((resolve, reject) => {
                    const querysaldoInicial = 'SELECT saldo_inicial FROM banco WHERE id = ? AND casal = ? AND usuario = ?';
                    connection.query(querysaldoInicial, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const saldoInicial = saldoInicialBD[0].saldo_inicial;
                //receitas
                const queryreceitas = 'SELECT SUM(valor) AS total_receitas FROM receita WHERE banco = ? AND casal = ? AND usuario = ?';
                const receitasBD = await new Promise((resolve, reject) => {
                    connection.query(queryreceitas, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const receitas = receitasBD[0].total_receitas || 0;

                const queryDespesas = 'SELECT SUM(valor) AS total_despesas FROM despesa WHERE banco = ? AND casal = ? AND usuario = ?';
                const despesasBD = await new Promise((resolve, reject) => {
                    connection.query(queryDespesas, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const despesas = despesasBD[0].total_despesas || 0;

                //Transferências de saída
                const queryTransfDeb = 'SELECT SUM(valor) AS total_transf_deb FROM transferencias WHERE banco_origem = ? AND casal = ? AND usuario = ? AND tipo = 0';
                const transfDebBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfDeb, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfDeb = transfDebBD[0].total_transf_deb || 0

                //Transferências de entrada
                const queryTransfCred = 'SELECT SUM(valor) AS total_transf_cred FROM transferencias WHERE banco_origem = ? AND casal = ? AND usuario = ? AND tipo = 1';
                const transfCredBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfCred, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfCred = transfCredBD[0].total_transf_cred || 0

                const saldo = (saldoInicial + receitas + transfCred) - (despesas + transfDeb);


                return { ...banco, saldo };
            }));

            //Saldos conjuntos
            const queryBancoCol = 'SELECT * FROM banco WHERE casal = ? AND tipo = 1 AND arquivo = 0';
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

                const queryDespesas = 'SELECT SUM(valor) AS total_despesas FROM despesa WHERE banco = ? AND casal = ?';
                const despesasBD = await new Promise((resolve, reject) => {
                    connection.query(queryDespesas, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const despesas = despesasBD[0].total_despesas || 0;

                //Transferências de saída
                const queryTransfDeb = 'SELECT SUM(valor) AS total_transf_deb FROM transferencias WHERE banco_origem = ? AND casal = ? AND tipo = 0';
                const transfDebBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfDeb, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfDeb = transfDebBD[0].total_transf_deb || 0

                //Transferências de entrada
                const queryTransfCred = 'SELECT SUM(valor) AS total_transf_cred FROM transferencias WHERE banco_origem = ? AND casal = ? AND tipo = 1';
                const transfCredBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfCred, [banco.id, casal], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfCred = transfCredBD[0].total_transf_cred || 0

                const saldo = (saldoInicial + receitas + transfCred) - (despesas + transfDeb);

                return { ...banco, saldo };
            }));


            const saldoIndividual = bancosComSaldoInd.reduce((acumulador, banco) => acumulador + banco.saldo, 0)
            const saldoColetivo = bancosComSaldoCol.reduce((acumulador, banco) => acumulador + banco.saldo, 0)

            return callback(null, { saldoIndividual, saldoColetivo });
        } catch (error) {
            console.error(`Não foi possível gerar o saldo ${error}`);
            return callback(error, null);
        }
    }

    static saldoPorPeriodo = async (casal, usuario, parceiro, ano, callback) => {
        try {
            //Saldos individuais
            //seleciona todos os bancos individuais
            const queryBancoInd = 'SELECT * FROM banco WHERE casal = ? AND usuario = ? AND tipo = 0 AND arquivo = 0';
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
                //Saldo inicial
                const saldoInicialBD = await new Promise((resolve, reject) => {
                    const querysaldoInicial = 'SELECT saldo_inicial FROM banco WHERE id = ? AND casal = ? AND usuario = ?';
                    connection.query(querysaldoInicial, [banco.id, casal, usuario], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const saldoInicial = saldoInicialBD[0].saldo_inicial;
                //receitas por mês
                const queryreceitas = 'SELECT sum(valor) AS total_receitas, mes FROM receita WHERE banco = ? AND casal = ? AND usuario = ? AND ano = ? group by mes order by mes';
                const receitasBD = await new Promise((resolve, reject) => {
                    connection.query(queryreceitas, [banco.id, casal, usuario, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const receitas = receitasBD[0] || 0;

                //despesas por mês
                const queryDespesas = 'SELECT sum(valor) AS total_despesas, mes FROM despesa WHERE banco = ? AND casal = ? AND usuario = ? AND ano = ? group by mes order by mes';
                const despesasBD = await new Promise((resolve, reject) => {
                    connection.query(queryDespesas, [banco.id, casal, usuario, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const despesas = despesasBD[0] || 0;

                //Transferências de saída
                const queryTransfDeb = 'SELECT SUM(valor) AS total_transf_deb, mes FROM transferencias WHERE banco_origem = ? AND casal = ? AND usuario = ? AND ano = ? AND tipo = 0 group by mes order by mes';
                const transfDebBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfDeb, [banco.id, casal, usuario, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfDeb = transfDebBD || 0

                //Transferências de entrada
                const queryTransfCred = 'SELECT SUM(valor) AS total_transf_cred, mes FROM transferencias WHERE banco_origem = ? AND casal = ? AND usuario = ? AND ano = ? AND tipo = 1 group by mes order by mes';
                const transfCredBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfCred, [banco.id, casal, usuario, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfCred = transfCredBD || 0

                const saldo = (saldoInicial + receitas + transfCred) - (despesas + transfDeb);


                return { saldoInicial, receitas, transfCred, despesas, transfDeb};
            }));

            //Saldos conjuntos
            //seleciona todos os bancos coletivos
            const queryBancoCol = 'SELECT * FROM banco WHERE casal = ? AND tipo = 1 AND arquivo = 0';
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

                const queryreceitas = 'SELECT SUM(valor) AS total_receitas, mes FROM receita WHERE banco = ? AND casal = ? AND ano = ? group by mes order by mes';
                const receitasBD = await new Promise((resolve, reject) => {
                    connection.query(queryreceitas, [banco.id, casal, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const receitas = receitasBD || 0;

                const queryDespesas = 'SELECT SUM(valor) AS total_despesas, mes FROM despesa WHERE banco = ? AND casal = ? AND ano = ? group by mes order by mes';
                const despesasBD = await new Promise((resolve, reject) => {
                    connection.query(queryDespesas, [banco.id, casal, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const despesas = despesasBD || 0;

                //Transferências de saída
                const queryTransfDeb = 'SELECT SUM(valor) AS total_transf_deb, mes FROM transferencias WHERE banco_origem = ? AND casal = ? AND ano = ? AND tipo = 0 group by mes order by mes';
                const transfDebBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfDeb, [banco.id, casal, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfDeb = transfDebBD[0] || 0

                //Transferências de entrada
                const queryTransfCred = 'SELECT SUM(valor) AS total_transf_cred, mes FROM transferencias WHERE banco_origem = ? AND casal = ? AND ano = ? AND tipo = 1 group by mes order by mes';
                const transfCredBD = await new Promise((resolve, reject) => {
                    connection.query(queryTransfCred, [banco.id, casal, ano], (err, results) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    });
                });

                const transfCred = transfCredBD[0] || 0

                const saldo = (saldoInicial + receitas + transfCred) - (despesas + transfDeb);

                return { saldoInicial, receitas, transfCred, despesas, transfDeb};
            }));


            const saldoIndividual = bancosComSaldoInd
            const saldoColetivo = bancosComSaldoCol

            return callback(null, { saldoIndividual, saldoColetivo });
        } catch (error) {
            console.error(`Não foi possível gerar o saldo ${error}`);
            return callback(error, null);
        }
    }
}

export default SaldosModel