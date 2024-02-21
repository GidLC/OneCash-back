import {connection} from '../../config.mjs'
import SeparaData from '../../data/SeparaData/SeparaData.mjs';

class DespesaColModel {
    static addDespesaCol = async (descricao, valor, usuario, cod_casal, categoria, status, data, banco, callback) => {
        const query = 'INSERT INTO despesa_col(descricao, valor, casal, categoria, status, dia, mes, ano, banco) VALUES (?,?,?,?,?,?,?,?,?)';
        const objData = await SeparaData(data)
        connection.query(query, [descricao, valor, cod_casal, categoria, status, objData.dia, objData.mes, objData.ano, banco], (err, results) => {
            if(err){
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static readDespesaCol = async (usuario, casal, mes, ano, callback) => {
        const query = 'SELECT * FROM despesa_col WHERE casal = ? AND  mes = ? AND ano = ?';

        connection.query(query, [casal, mes, ano], (err, results) => {
            if(err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }
}

export default DespesaColModel