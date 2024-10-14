import AuthModel from "../../models/autenticacao/authModel.mjs";


const loginUsuario = (req, res) => {
  const { email, senha } = req.body;
  AuthModel.loginUsuario(email, senha, (err, resultado) => {
    if (err) {
      console.error('Erro ao encontrar  usuário:', err);
      return res.status(500).json({message: `Erro ao realizar login: ${err}`});
    }
    res.status(200).json({ message: 'Usuário encontrado com sucesso', resultado });
  });
};

const cadastroUsuario = (req, res) => {
  const { nome, email, senha, email_parceiro, fone, dt_criacao } = req.body;

  // Chame o método salvarUsuario do modelo
  AuthModel.cadastroUsuario(nome, email, senha, email_parceiro, fone, dt_criacao, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o usuário:', err);
      return res.status(500).json({ error: 'Erro ao salvar o usuário' });
    }
    res.status(200).json({ message: 'Usuário cadastrado com sucesso', resultado });
  });
};

const buscaCadastro = (req, res) => {
  const { codigo } = req.body;
  AuthModel.buscaCadastro(codigo, (err, results) => {
    if (err) {
      console.error('Erro ao encontrar cadastro:', err);
      return res.status(500).json({ error: 'Erro ao encontrar cadastro' });
    } else if(results == 0) {
      return res.status(200).json({ message: 'Não há usuário no aplicativo com esse código', results });
    } else if (results == 1) {
      console.log(`PARCEIRO`)
      return res.status(200).json({ message: 'Esse usuário já possui um parceiro', results });
    }
    res.status(200).json(results);
  });
};

const vincCadastro = (req, res) => {
  console.log(req.body)
  const { nome, email, senha, cod_casal, email_parceiro, dt_criacao, id_usuario_princ, fone } = req.body;

  AuthModel.vincCadastro(nome, email, senha, cod_casal, email_parceiro, dt_criacao, id_usuario_princ, fone, (err, resultado) => {
    if (err) {
      console.error('Erro ao vincular usuário :', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'Usuário vinculado com sucesso', resultado });
  });
};

const buscaCadastroEmail = (req, res) => {
  const email = req.header('email');
  console.log(email);

  AuthModel.buscaCadastroEmail(email, (err, results) => {
    if (err) {
      console.error('Erro ao encontrar cadastro');
      return res.status(500).json({ error: 'Erro ao encontrar cadastro' });
    } else if (!results) {
      return ({ message: 'Não foi possível encontrar o usuário' })
    }
    return res.status(200).json({ message: 'Usuário encontrado', results })
  })
}

const validaToken = (req, res) => {
  const token = req.header('token');

  AuthModel.validaToken(token, (err, results) => {
    if (err || results == null) {
      return res.status(500).json({error: 'Token inválido'});
    } 
    return res.status(200).json({message: 'Token validado', results})
  });
};

const mudaSenha = (req, res) => {
  const {id, novaSenha} = req.body;
  console.log(`id: ${id}, nova senha: ${novaSenha}`)

  AuthModel.mudaSenha(id, novaSenha, (err, results) => {
    if (err) {
      return res.status(500).json({error: 'Erro ao mudar a senha'});
    }

    return res.status(200).json({message: 'Senha alterada com sucesso', results})
  })
}

const editUser = (req, res) => {
  const {nome, email, fone, id} = req.body
  console.log(nome, email, fone, id)

  AuthModel.editUser(nome, email, fone, id, (err, results) => {
    if (err) {
      return res.status(500).json({error: "Erro ao realizar a alteração"})
    }

    return res.status(200).json({message: "Alteração realizada com sucesso", results})
  })
}

export default { cadastroUsuario, loginUsuario, buscaCadastro, vincCadastro, buscaCadastroEmail, validaToken, mudaSenha, editUser}

