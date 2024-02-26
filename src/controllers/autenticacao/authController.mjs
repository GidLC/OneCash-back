import AuthModel from "../../models/autenticacao/authModel.mjs";


const loginUsuario = (req, res) => {
  const { email, senha } = req.body;
  AuthModel.loginUsuario(email, senha, (err, resultado) => {
    if (err) {
      console.error('Erro ao encontrar  usuário:', err);
      return res.status(500).json({ error: 'Erro ao encontrar o usuário' });
    }
    res.status(200).json({ message: 'Usuário encontrado com sucesso', resultado });
  });
};

const cadastroUsuario = (req, res) => {
  const { nome, email, senha, email_parceiro, dt_criacao } = req.body;

  // Chame o método salvarUsuario do modelo
  AuthModel.cadastroUsuario(nome, email, senha, email_parceiro, dt_criacao, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o usuário:', err);
      return res.status(500).json({ error: 'Erro ao salvar o usuário' });
    }
    res.status(200).json({ message: 'Usuário salvo com sucesso', resultado });
  });
};

const buscaCadastro = (req, res) => {
  console.log(`buscaCadastro`)
  const { codigo } = req.params;
  AuthModel.buscaCadastro(codigo, (err, resultados) => {
    if (err) {
      console.error('Erro ao listar os produtos:', err);
      return res.status(500).json({ error: 'Erro ao listar os produtos' });
    }
    res.status(200).json(resultados);
  });
};

const vincCadastro = (req, res) => {
  console.log(req.body)
  const { nome, email, senha, cod_casal, dt_criacao, id_usuario_princ } = req.body;

  AuthModel.vincCadastro(nome, email, senha, cod_casal, dt_criacao, id_usuario_princ, (err, resultado) => {
    if (err) {
      console.error('Erro ao vincular usuário :', err);
      return res.status(500).json({ error: 'Erro ao vincular usuário' });
    }
    res.status(200).json({ message: 'Usuário vinculado com sucesso', resultado });
  });
};

export default { cadastroUsuario, loginUsuario, buscaCadastro, vincCadastro }

