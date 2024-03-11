import { connection } from "../../config.mjs";

class frontModel {

    static buscaCores = (callback) => {
        const query = 'SELECT id, nome, codigo AS cor FROM cor';
        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        });
    };

    static buscaCorID = (id, callback) => {
        const query = 'SELECT id, nome, codigo AS cor FROM cor WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0])
        })
    }

    static buscaIcones = (callback) => {
        const query = 'SELECT * FROM icones';
        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null)
            }
            callback(null, results)
        })
    }

    static buscaIconeID = (id, callback) => {
        const query = 'SELECT * FROM icones WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            callback(null, results[0])
        })
    }
}

export default frontModel;