import { connection } from "../../config.mjs";

class frontModel {

    static buscaCores = (callback) => {
        const query = 'SELECT * FROM cor';
        connection.query(query, (err, results) => {
            if(err){
                return callback(err, null);
            }
            callback(null, results)
        });
    };

    static buscaIcones = (callback) => {
        const query = 'SELECT * FROM icones';
        connection.query(query, (err, results) => {
            if(err) {
                return callback(err, null)
            }
            callback(null, results)
        })
    }
}

export default frontModel;