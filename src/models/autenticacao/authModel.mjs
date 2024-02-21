// produtoModel.js
import { connection } from "../../config.mjs";
import * as crypto from 'crypto'

class AuthModel {

  static cadastroUsuario = (nome, email, senha, dt_criacao, callback) => {
    const codigoCasal = crypto.randomBytes(4).toString('hex');
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

    const query = 'INSERT INTO usuario (nome, email, senha, casal, dt_criacao) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nome, email, senhaHash, codigoCasal, dt_criacao], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, results)
    });
  }

  static buscaCadastro(codigo, callback) {
    console.log(codigo)
    const query = 'SELECT nome, id FROM usuario WHERE casal = ?';
    connection.query(query, [codigo], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Não há usuário cadastrado com esse código de vinculação
      }
      callback(null, results[0]);
    });
  }

  static vincCadastro = async (nome, email, senha, cod_casal, dt_criacao, id_usuario_princ) => {
    try {
      const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
      const queryUsuario = 'INSERT INTO usuario (nome, email, senha, casal, dt_criacao) VALUES (?, ?, ?, ?, ?)';
      const usuarioResult = await new Promise((resolve, reject) => {
        connection.query(queryUsuario, [nome, email, senhaHash, cod_casal, dt_criacao], (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        });
      });

      const userId = usuarioResult.insertId;

      const queryCasal = 'INSERT INTO casal (cod_casal, usuario_princ_casal, usuario_sec_casal) VALUES (?, ?, ?)';
      const casalResult = await new Promise((resolve, reject) => {
        connection.query(queryCasal, [cod_casal, id_usuario_princ, userId], (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        });
      });

      return casalResult;

    } catch (error) {
      throw new Error('Erro ao vincular usuários');
    }
  }



  static loginUsuario = (email, senha, callback) => {
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex')
    const query = `SELECT * FROM usuario where email = ? AND senha = ?`;
    connection.query(query, [email, senhaHash], (err, results) => {
      if (err) {
        return callback(err, null);
      } else if (results.length == 0) {
        err = `Usuário não encontrado na base de dados`;
        return callback(err, null)
      } else {
        console.log(results[0])
        callback(null, results[0]);
      }
    })
  }

}

export default AuthModel;
