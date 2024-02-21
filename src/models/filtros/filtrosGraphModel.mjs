import { connection } from '../../config.mjs'

class filtrosGraphModel {
    static receitaPorCategoria = async (casal, callback) => {
        const queryCategoria = 'SELECT * from categoria_tr WHERE casal = ? AND tipo = 1'
        const categoriasBD = await new Promise((resolve, reject) => {
            connection.query(queryCategoria, [casal], (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            });
        });

        const saldos = await Promise.all(categoriasBD.map(async (categoria) => {
            const saldoPorCategoriaBD = await new Promise((resolve, reject) => {
                const querySaldoPorCategoria = 'SELECT SUM(valor) AS total_receitas FROM receita WHERE categoria = ? AND casal = ?';
                connection.query(querySaldoPorCategoria, [categoria.id, casal], (err, results) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(results);
                });
            });

            const saldoPorCategoria = saldoPorCategoriaBD[0].total_receitas || 0;

            return{...categoria, saldoPorCategoria};
        }));

        return callback(null, saldos)
    }
}

export default filtrosGraphModel