import { connection } from "../../config.mjs"
import SeparaData from "../../data/SeparaData/SeparaData.mjs";

class ReceitaModel {

    static addReceita = async (descricao, valor, usuario, cod_casal, categoria, status, data, banco, callback) => {
        const query = 'INSERT INTO receita (descricao, valor, usuario, casal, categoria, status, dia, mes, ano, banco) VALUES (?,?,?,?,?,?,?,?,?,?)';
        const objData =  await SeparaData(data)
        connection.query(query, [descricao, valor, usuario, cod_casal, categoria, status, objData.dia, objData.mes , objData.ano, banco], (err, results) => {
            if(err) {
                return callback(err, null)
            }
    
            return callback(null, results)
        })
    }

    static readReceita = async (usuario, casal, mes, ano, callback) => {
        const query = 'SELECT * FROM receita where usuario = ? AND casal = ? AND mes = ? AND ano = ?';

        connection.query(query, [usuario, casal, mes, ano], (err, results) => {
            if (err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

    static deleteReceita = async (id, usuario, casal, callback) => {
        const query = 'DELETE FROM receita WHERE id = ? AND usuario = ? AND casal = ?';

        connection.query(query, [id, usuario, casal], (err, results) => {
            if(err) {
                return callback(err, null)
            }

            return callback(null, results)
        })
    }

}

export default ReceitaModel