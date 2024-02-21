import { connection } from "../../config.mjs";

class corModel {

    static buscaCores = (callback) => {
        const query = 'SELECT * FROM cor';
        connection.query(query, (err, results) => {
            if(err){
                return callback(err, null);
            }
            callback(null, results)
        });
    };
}

export default corModel;