import { pool } from "../../config.mjs";
import SeparaData from '../../data/SeparaData/SeparaData.mjs';
import * as crypto from 'crypto';

class DespesaModel {
    static addDespesa = async (descricao, valor, usuario, cod_casal, categoria, status, data, banco, tipo, fixa, callback) => {
        try {
            const objData = await SeparaData(data)
            const anoAtual = new Date().getFullYear();

            //Cadastro de despesa padrão
            if (fixa == 0 || !fixa) {
                const query = 'INSERT INTO despesa(descricao, valor, usuario, casal, categoria, status, dia, mes, ano, banco, tipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                pool.query(query, [descricao, valor, usuario, cod_casal, categoria, status, objData.dia, objData.mes, objData.ano, banco, tipo], (err, results) => {
                    if (err) {
                        return callback(err, null)
                    }

                    return callback(null, results)
                })
            } else if (fixa == 1) {
                //Cadastro de despesa fixa
                const id_uuid = crypto.randomUUID();
                const query = 'INSERT INTO despesas_fixas(id_fixo, descricao, valor, tipo, status, dia, mes, ano, data_criacao, casal, usuario, banco, categoria) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
                const promisses = [];

                for (let ano = objData.ano; ano < objData.ano + 30; ano++) {
                    const mesInicial = (ano == anoAtual) ? objData.mes : 0;
                    //Cadastro da despesa nos meses do ano atual
                    for (let mes = mesInicial; mes < 12; mes++) {
                        promisses.push(
                            new Promise((resolve, reject) => {
                                pool.query(query, [id_uuid, descricao, valor, tipo, status, objData.dia, mes, ano, data, cod_casal, usuario, banco, categoria], (err, results) => {
                                    if (err) {
                                        reject(err);
                                    }

                                    resolve(results);
                                });
                            })
                        )

                    }
                }

                await Promise.all(promisses);
                return callback(null, { message: 'Despesas fixas cadastradas com sucesso!' })

            } else {
                const err = 'O tipo de despesa específicado não é válido';
                return callback(err, null)
            }
        } catch (error) {
            return callback(error, null)
        }

    }

    //Busca todas as depesas de um determinado mês e ano(individuais ou coletivas, fixas ou não)
    static readDespesa = async (usuario, casal, mes, ano, tipo, fixa, callback) => {
        try {
            const tabela = (fixa == 0 || !fixa) ? 'despesa' : 'despesas_fixas';
            const camposFixos = (fixa == 1) ? ', des.id_fixo, des.data_criacao' : '';
            const queryBase = `
                SELECT des.id, des.descricao, des.valor, des.dia, des.mes, des.ano, des.status, 
                       cat.nome AS nome_categoria, ic.ion_nome AS nome_icone, 
                       cor.codigo AS cod_cor, ba.nome AS nome_banco, cat.tipo AS tipo_categoria${camposFixos}
                FROM ${tabela} AS des
                INNER JOIN categoria_tr AS cat ON cat.id = des.categoria
                INNER JOIN icones AS ic ON ic.id = cat.icone
                INNER JOIN cor ON cor.id = cat.cor
                INNER JOIN banco AS ba ON ba.id = des.banco
                WHERE des.casal = ? AND des.mes = ? AND des.ano = ? AND des.tipo = ?`;

            // Adiciona condição extra para despesas individuais
            const query = (tipo == 0) ? `${queryBase} AND des.usuario = ?` : queryBase;

            // Define os parâmetros baseados no tipo
            const params = (tipo == 0)
                ? [casal, mes, ano, tipo, usuario]
                : [casal, mes, ano, tipo];

            pool.query(query, params, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, results);
            });
        } catch (error) {
            console.error('Erro ao executar consulta:', error);
            return callback(error, null);
        }
    }

    static readDespesaID = async (id, casal, fixa, callback) => {
        try {
            const tabela = (fixa == 0 || !fixa) ? 'despesa' : 'despesas_fixas';
            const camposFixos = (fixa == 1) ? ', des.id_fixo, des.data_criacao' : '';
            const query= `SELECT des.id, des.descricao, des.valor, des.tipo, des.dia, des.mes, des.ano, des.status, cat.id AS id_categoria, cat.nome AS nome_categoria, 
                        ba.id AS id_banco, ba.nome AS nome_banco${camposFixos} FROM ${tabela} AS des
                            INNER JOIN categoria_tr AS cat ON cat.id = des.categoria
                            INNER JOIN banco AS ba ON ba.id = des.banco
                                WHERE des.id = ? AND des.casal = ?`;

            pool.query(query, [id, casal], (err, results) => {
                if (err) {
                    return callback(err, null)
                }

                return callback(null, results[0])
            })
        } catch (error) {
            return callback(error, null)
        }
    }

    //Através dessa edição só é possível editar uma despesa fixa
    static editDespesa = async (casal, id, descricao, categoria, valor, data, tipo, status, fixa, callback) => {
        console.log(fixa)
        const tabela = (fixa == 0 || !fixa) ? 'despesa' : 'despesas_fixas';
        const query = `UPDATE ${tabela} SET descricao = ?, categoria = ?, valor =?, dia = ?, mes = ?, ano = ?, tipo = ?, status = ? WHERE casal = ? AND id = ?`
        const objData = await SeparaData(data)
        pool.query(query, [descricao, categoria, valor, objData.dia, objData.mes, objData.ano, tipo, status, casal, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    
    //Função para editar todas despesas fixas e pendentes

    static editDespesaFixa = async (casal, id_fixo, descricao, categoria, valor, data, tipo, status, pendentes, callback) => {
        const query = `UPDATE despesas_fixas SET descricao = ?, categoria = ?, valor = ?, dia = ?, mes = ?, ano = ?, tipo = ?, status = ? WHERE casal = ? AND id_fixo = ? ${pendentes == 1 ? `AND status = 0`: ``}`; 
        const objData = await SeparaData(data);
        console.log(query)
        pool.query(query, [descricao, categoria, valor, objData.dia, objData.mes, objData.ano, tipo, status, casal, id_fixo], (err, results) => {
            if (err) {
                return callback(err, null);
            }

            return callback(null, results);
        })
    }

    static deleteDespesa = async (casal, id, fixa, callback) => {
        const tabela = (fixa == 0 || !fixa) ? 'despesa' : 'despesas_fixas';
        const query = `DELETE FROM ${tabela} WHERE casal = ? AND id = ?`;

        pool.query(query, [casal, id], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteDespesaPend = async (casal, id_fixo, callback) => {
        const query = `DELETE FROM despesas_fixas WHERE casal = ? AND id_fixo = ? AND status = 0`;

        pool.query(query, [casal, id_fixo], (err, results) => {
            if (err) {
                return callback(err, null);
            }

            return callback(null, results)
        })
    }

    static efetivaDespesa = async (casal, despesaId, fixa, callback) => {
        //Verificar se a despesa já está efetivada
        const tabela = (fixa == 0 || !fixa) ? 'despesa' : 'despesas_fixas';
        const query = `UPDATE ${tabela} SET status = 1 WHERE casal = ? AND id = ?`;

        pool.query(query, [casal, despesaId], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }
}

export default DespesaModel