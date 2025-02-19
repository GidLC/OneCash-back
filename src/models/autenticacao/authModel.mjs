import { pool } from '../../config.mjs';
import * as crypto from 'crypto'
import enviaEmail from "../../data/enviaEmail/enviaEmail.mjs";
import EmailParceiro from "../../data/emails/Cadastro/EmailParceiro.mjs";
import EmailCadastro from "../../data/emails/Cadastro/EmailCadastro.mjs";
import enviaWhats from '../../data/enviaWhats/enviaWhats.mjs';

class AuthModel {

  static cadastroUsuario = async (nome, email, senha, email_parceiro, fone, dt_criacao, callback) => {
    const codigoCasal = crypto.randomBytes(3).toString('hex');
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

    //categorias de despesa padrão: Alimentação, Moradia, transporte, saúde, educação, lazer, roupas e acessórios, água/luz/internet, despesas diversas
    //categorias de receita padrão: Salário, rendimentos, presentes, vales

    const queryUsuario = 'INSERT INTO usuario (nome, email, senha, email_parceiro, casal, dt_criacao, fone) VALUES (?, ?, ?, ?, ?, ?, ?)';

    //Cria cadastro do usuário principal
    const usuario = await new Promise((resolve, reject) => {
      pool.query(queryUsuario, [nome, email, senhaHash, email_parceiro, codigoCasal, dt_criacao, fone], async (err, results) => {
        if (err) {
          reject(err)
        }

        await enviaEmail(email,
          "Cadastro no OneCash",
          EmailCadastro(nome, codigoCasal)
        );

        await enviaEmail(email_parceiro,
          "Cadastro no OneCash",
          EmailParceiro(nome, codigoCasal))

        await enviaWhats(fone, `Você acaba de realizar o cadastro no app OneCash, para que seu parceiro se vincule a você ele precisa do código: ${codigoCasal}`)

        resolve(results)
      });
    })

    const userId = usuario.insertId;

    //Cria tabela para vínculo do casal
    const queryCasal = 'INSERT INTO casal (cod_casal, usuario_princ) VALUES (?, ?)';
    await new Promise((resolve, reject) => {
      pool.query(queryCasal, [codigoCasal, userId], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });

    //Insere categorias padrões
    const queryCategoria = `
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Alimentação", 0, 2, 21, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Moradia", 0, 3, 27, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Transporte", 0, 4, 16, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Saúde", 0, 5, 29, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Educação", 0, 6, 11, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Lazer", 0, 7, 28, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Roupas e Acessórios", 0, 8, 33, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Água/Luz/Internet", 0, 9, 39, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Despesas Diversas", 0, 10, 36, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("*Ajuste*",0, 2, 36, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Salário", 1, 11, 38, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Rendimentos", 1, 12, 37, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Presentes", 1, 13, 26, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("Vales", 1, 14, 31, ?);
      INSERT INTO categoria_tr (nome, tipo, cor, icone, casal) VALUES("*Ajuste*",1, 3, 37, ?);
      `;

    try {
      const queries = queryCategoria.split(';').filter(query => query.trim() !== '');
      await Promise.all(queries.map((query) => {
        return new Promise((resolve, reject) => {
          pool.query(query, [codigoCasal], (err, results) => {
            if (err) {
              reject(err);
            }
            resolve(results);
          });
        });
      }));
    } catch (error) {
      console.error("Erro ao inserir categorias:", error);
    }

    //Cria contas bancárias padrão
    const queryBancos = `
                          INSERT INTO banco (nome, tipo, saldo_inicial, casal, usuario) VALUES ("Carteira", 0, 0, ?, ?);
                          INSERT INTO banco (nome, tipo, saldo_inicial, casal, usuario) VALUES ("Nossa Conta", 1, 0, ?, ?);`

    try {
      const queries = queryBancos.split(';').filter(query => query.trim() !== '');
      await Promise.all(queries.map((query) => {
        return new Promise((resolve, reject) => {
          pool.query(query, [codigoCasal, userId], (err, results) => {
            if (err) {
              reject(err);
            }
            resolve(results);
          });
        });
      }));
    } catch (error) {
      console.error("Erro ao inserir Bancos:", error);
    }

    return callback(null, "Usuário cadastrado")
  }


  static buscaCadastro(codigo, callback) {
    const query = 'SELECT user.nome, user.id, casal.usuario_sec FROM usuario AS user INNER JOIN casal ON casal.usuario_princ = user.id WHERE casal = ?';
    pool.query(query, [codigo], (err, results) => {
      if (err) {
        return callback(err, null);
      } else if (results.length === 0) {
        return callback(null, 0); // Não há usuário cadastrado com esse código de vinculação
      } else if (results[0].usuario_sec != null) {
        return callback(null, 1);
      }
      callback(null, results[0]);
    });
  }

  //Realizar uma validação de vinculação mais segura, como solicitar o email do parceiro principal
  static vincCadastro = async (nome, email, senha, cod_casal, email_parceiro, dt_criacao, id_usuario_princ, fone, callback) => {
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');
    //verificar se o email a ser vinculado é o mesmo que está cadastrado no usuário principal
    const queryParceiro = 'SELECT * FROM usuario WHERE email_parceiro = ?'
    const parceiro = await new Promise((resolve, reject) => {
      pool.query(queryParceiro, [email], (err, results) => {
        if (err) {
          reject(err)
        } else if (results.length == 0) {
          err = `Confirme com seu parceiro se ele colocou esse como seu e-mail`
          return callback(err, null)
        } else {
          resolve(results)
        }
      })
    })

    //Insere usuário na tabela
    const queryUsuario = 'INSERT INTO usuario (nome, email, senha, casal, email_parceiro, dt_criacao, fone) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const usuarioResult = await new Promise((resolve, reject) => {
      pool.query(queryUsuario, [nome, email, senhaHash, cod_casal, email_parceiro, dt_criacao, fone], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });

    const userId = usuarioResult.insertId;

    //Cria linha na tabela de casal
    const queryCasal = 'UPDATE casal SET usuario_sec = ? WHERE cod_casal = ?';
    const casalResult = await new Promise((resolve, reject) => {
      pool.query(queryCasal, [userId, cod_casal], (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });

    const queryBancos = `INSERT INTO banco (nome, tipo, saldo_inicial, casal, usuario) VALUES ("Carteira", 0, 0, ?, ?);`

    try {
      const queries = queryBancos.split(';').filter(query => query.trim() !== '');
      await Promise.all(queries.map((query) => {
        return new Promise((resolve, reject) => {
          pool.query(query, [cod_casal, userId], (err, results) => {
            if (err) {
              reject(err);
            }
            resolve(results);
          });
        });
      }));
    } catch (error) {
      console.error("Erro ao inserir Banco:", error);
    }

    enviaWhats(fone, `Você acaba de se vincular como parceira de ${parceiro.nome} no aplicativo OneCash. Aproveitem a aplicação e sucesso`)
    return callback(null, casalResult);
  }

  static loginUsuario = async (email, senha, callback) => {
    try {
      const senhaHash = crypto.createHash('sha256').update(senha).digest('hex')
      const data = new Date()
      const hoje = data.toISOString()

      //Verifica a existência do usuário
      const queryLogin = `SELECT * FROM usuario where email = ? AND senha = ?`;
      const login = await new Promise((resolve, reject) => {
        pool.query(queryLogin, [email, senhaHash], (err, results) => {
          if (err) {
            reject(err)
          } else if (results.length == 0) {
            err = `Usuário não encontrado`
            return callback(err, null)
          } else {
            resolve(results)
          }
        })
      })

      //Verifica a existência de uma casal vinculado ao usuário
      const queryCasal = `SELECT * FROM casal WHERE usuario_princ = ? OR usuario_sec = ?`;
      const casal = await new Promise((resolve, reject) => {
        pool.query(queryCasal, [login[0].id, login[0].id], (err, results) => {
          if (err) {
            reject(err)
          } else if (results.length == 0) {
            err = `Você e seu parceiro não formaram um casal em nosso app`;
            return callback(err, null)
          } else {
            resolve(results)
          }
        })
      })

      //registra login do usuário
      /*const queryDataLogin = 'UPDATE usuario SET ultimo_acesso = ? WHERE id = ?';
      await new Promise((resolve, reject) => {
        pool.query(queryDataLogin, [hoje, login[0].id], (err, results) => {
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
      })*/

      if (casal[0].usuario_sec !== null) {
        if (login[0].id == casal[0].usuario_princ) {
          const id_parceiro = casal[0].usuario_sec
          const queryParceiro = `SELECT * FROM usuario where id = ?`;
          const parceiro = await new Promise((resolve, reject) => {
            pool.query(queryParceiro, [id_parceiro], (err, results) => {
              if (err) {
                reject(err)
              } else {
                resolve(results)
              }
            })
          });
  
          return callback(null, {
            id: login[0].id,
            nome: login[0].nome,
            email: login[0].email,
            fone: login[0].fone,
            cod_casal: casal[0].cod_casal,
            id_parceiro: id_parceiro,
            nome_parceiro: parceiro[0].nome,
            email_parceiro: login[0].email_parceiro,
            fone_parceiro: parceiro[0].fone,
          })
        } else {
          const id_parceiro = casal[0].usuario_princ
          const queryParceiro = `SELECT * FROM usuario where id = ?`;
          const parceiro = await new Promise((resolve, reject) => {
            pool.query(queryParceiro, [id_parceiro], (err, results) => {
              if (err) {
                reject(err)
              } else {
                resolve(results)
              }
            })
          });
          return callback(null, {
            id: login[0].id,
            nome: login[0].nome,
            email: login[0].email,
            fone: login[0].fone,
            cod_casal: casal[0].cod_casal,
            id_parceiro: id_parceiro,
            nome_parceiro: parceiro[0].nome,
            email_parceiro: login[0].email_parceiro,
            fone_parceiro: parceiro[0].fone
          })
        }
      } else {
        return callback({message: "Usuário sem parceiro vinculado a ele"})
      }
    } catch (error) {
      throw error
    }
  }

  static buscaCadastroEmail = async (email, callback) => {
    const token = crypto.randomBytes(2).toString('hex');
    const data = new Date()
    const validade = new Date(data.getTime() + 2 * 60 * 60 * 1000).toISOString();
    console.log(validade)

    const queryUsuario = `SELECT * FROM usuario WHERE email = ?`;
    const buscaUsuario = await new Promise((resolve, reject) => {
      pool.query(queryUsuario, [email], (err, results) => {
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
      pool.query(queryToken, [userId, token, validade], (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });

    enviaEmail(email, "Mudança de senha no OneCash", `Para realizar a mudança de sua senha digite o código ${token}`);
    enviaWhats(buscaUsuario[0].fone, `Você acaba de solicitar a mudança de senha no aplicativo OneCash. Seu código de alteração é o: ${token}`)
    return callback(null, "Token Gerado")
  };

  static validaToken = (token, callback) => {
    const data = new Date();
    const query = 'SELECT * FROM senha_temp WHERE token = ?';

    pool.query(query, [token], (err, results) => {
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
    pool.query(query, [senhaHash, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, results)
    })
  }

  static editUser = (nome, email, fone, id, callback) => {
    const query = 'UPDATE usuario SET nome = ? AND email = ? AND fone = ? WHERE id = ?'
    pool.query(query, [nome, email, fone, id], (err, results) => {
      if (err) {
        return callback(err, null)
      }


      return callback(null, results)
    })
  }

}

//Criar lógica para excluir dados do BD

export default AuthModel;