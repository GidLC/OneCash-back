// produtoModel.js
import { connection } from "../../config.mjs";
import * as crypto from 'crypto'
import enviaEmail from "../../data/enviaEmail/enviaEmail.mjs";

class AuthModel {

  static cadastroUsuario = (nome, email, senha, email_parceiro, dt_criacao, callback) => {
    const codigoCasal = crypto.randomBytes(4).toString('hex');
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

    const query = 'INSERT INTO usuario (nome, email, senha, email_parceiro, casal, dt_criacao) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [nome, email, senhaHash, email_parceiro, codigoCasal, dt_criacao], async (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const resEmailPrinc = await enviaEmail(email,
        "Cadastro no OneCash",
        `Você acaba de se cadastrar no OneCash, o melhor aplicativo de finanças familiar. O código casal seu e de seu(sua) parceiro(a) é o ${codigoCasal}. 
          Seu parceiro(a) vai precisar dele para se vincular a você, mas não se preocupe já enviamos pra ele(a) também`);

      const resEmailSec = await enviaEmail(email_parceiro,
        "Cadastro no OneCash",
        `${nome} acaba de se cadastrar no aplicativo OneCash e te colocou como parceiro dele. 
          Seu código para se vincular a ele e criar o casal de vocês em nosso aplicativo é ${codigoCasal}.`)

      return callback(null, { results, resEmailPrinc, resEmailSec })
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

  static vincCadastro = async (nome, email, senha, cod_casal, email_parceiro, dt_criacao, id_usuario_princ, callback) => {
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
    const queryUsuario = 'INSERT INTO usuario (nome, email, senha, casal, email_parceiro, dt_criacao) VALUES (?, ?, ?, ?, ?, ?)';
    const usuarioResult = await new Promise((resolve, reject) => {
      connection.query(queryUsuario, [nome, email, senhaHash, cod_casal, email_parceiro, dt_criacao], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });

    const userId = usuarioResult.insertId;

    const queryCasal = 'INSERT INTO casal (cod_casal, usuario_princ, usuario_sec) VALUES (?, ?, ?)';
    const casalResult = await new Promise((resolve, reject) => {
      connection.query(queryCasal, [cod_casal, id_usuario_princ, userId], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });

    return callback(null, casalResult);

  }




  static loginUsuario = (email, senha, callback) => {
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex')
    const query = `SELECT * FROM usuario where email = ? AND senha = ?`;
    connection.query(query, [email, senhaHash], (err, results) => {
      console.log(results)
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
    //Verificar se há um casal vinculado a esse usuario (se sim login efetuado, se não não efetuar login)
    //Registrar acesso do usuário
  }

  static buscaCadastroEmail = async (email, callback) => {
    console.log(email)
    const token = crypto.randomBytes(2).toString('hex');
    const data = new Date()
    const validade = new Date(data.getTime() + 2 * 60 * 60 * 1000).toISOString();
    console.log(validade)

    const queryUsuario = `SELECT * FROM usuario WHERE email = ?`;
    const buscaUsuario = await new Promise((resolve, reject) => {
      connection.query(queryUsuario, [email], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length == 0) {
          resolve(results);
        }
        resolve(results)
      });
    });

    if (!buscaUsuario[0]) {
      return callback("Usuário não encontrado", null);
    }

    const userId = buscaUsuario[0].id
    const queryToken = "INSERT INTO senha_temp (id_usuario, token, validade) VALUES (?,?,?)";
    await new Promise((resolve, reject) => {
      connection.query(queryToken, [userId, token, validade], (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });

    enviaEmail(email, "Mudança de senha no OneCash", `Para realizar a mudança de sua senha digite o código ${token}`);
    return callback(null, "Token Gerado")
  };

  static validaToken = (token, callback) => {
    const data = new Date();
    const query = 'SELECT * FROM senha_temp WHERE token = ?'
    connection.query(query, [token], (err, results) => {
      if (err || results.length == 0) {
        return callback(err, null)
      } else if (data >= results[0].validade) {
        console.log(`Token vencido`)
        return callback("Token Vencido", null)
      } else {
        return callback(null, results[0])
      }
    });
  }

  static mudaSenha = (id, novaSenha, callback) => {
    const senhaHash = crypto.createHash('sha256').update(novaSenha).digest('hex');
    const query = 'UPDATE usuario SET senha = ? WHERE id = ?';
    connection.query(query, [senhaHash, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, results)
    })
  }

}

export default AuthModel;
