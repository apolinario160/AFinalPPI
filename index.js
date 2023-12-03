const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(cookieParser());
app.use(session({
  secret: 'suaChaveSecreta',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 30 * 60 * 1000 }
}));






// Controladores
const userController = {
  exibirFormularioCadastro: (req, res) => {
    // Lógica para exibir o formulário de cadastro
    res.send('Exibindo formulário de cadastro');
  },
  cadastrarUsuario: (req, res) => {
    // Lógica para capturar parâmetros, validar dados e responder com a lista de usuários cadastrados
    res.send('Cadastro de usuário realizado com sucesso');
  },
  exibirBatePapo: (req, res) => {
    // Lógica para exibir o bate-papo e as mensagens
    res.send('Exibindo o bate-papo');
  },
  postarMensagem: (req, res) => {
    // Lógica para capturar parâmetros, validar dados, adicionar mensagem na lista e responder com a página atualizada
    res.send('Mensagem postada com sucesso');
  }
};

// Rotas
app.get('/cadastroUsuario', userController.exibirFormularioCadastro);
app.post('/cadastrarUsuario', userController.cadastrarUsuario);
app.get('/bate-papo', userController.exibirBatePapo);
app.post('/postarMensagem', userController.postarMensagem);
// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para exibir o formulário
app.get('/cadastroUsuario', (req, res) => {
  res.sendFile(__dirname + '/cadastroUsuario.html');
});

// Rota para processar o cadastro de usuário
app.post('/cadastrarUsuario', (req, res) => {
  const { nome, dataNascimento, nickname } = req.body; // Capturando os dados do formulário

  // Lógica para validar e adicionar o usuário à lista de cadastrados
  // Aqui, você pode utilizar um banco de dados, uma estrutura de dados em memória, etc.
  // Por enquanto, vou apenas mostrar os dados recebidos para demonstração
  console.log('Dados recebidos:', { nome, dataNascimento, nickname });

  // Enviando uma resposta para confirmar o cadastro (você pode alterar isso conforme sua lógica real)
  res.send('Usuário cadastrado com sucesso!');
});

const usuariosCadastrados = []; // Lista de usuários cadastrados (simulação)

// Dados simulados de usuário (em um caso real, esses dados estariam em um banco de dados)
const usuarios = [
    { id: 1, nome: 'usuario1', senha: 'senha123' },
    { id: 2, nome: 'usuario2', senha: 'abc123' }
  ];
  
  // Rota para login
  app.post('/login', (req, res) => {
    const { nome, senha } = req.body; // Dados de login enviados pelo formulário
  
    // Simulação de validação de login
    const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);
  
    if (!usuario) {
      return res.status(401).send('Credenciais inválidas');
    }
  
    // Definindo informações de sessão (simulado)
    req.session.usuarioId = usuario.id;
    req.session.isLoggedIn = true;
  
    res.send('Login bem-sucedido!');
  });
  
  // Rota para logout
  app.post('/logout', (req, res) => {
    // Limpa os dados da sessão para fazer logout
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Erro ao fazer logout');
      }
      res.send('Logout bem-sucedido!');
    });
  });
  

// Rota para processar o cadastro de usuário
app.post('/cadastrarUsuario', (req, res) => {
  const { nome, dataNascimento, nickname } = req.body; // Capturando os dados do formulário

  // Simulação de validação dos dados (verifica se os campos estão preenchidos)
  if (!nome || !dataNascimento || !nickname) {
    return res.status(400).send('Por favor, preencha todos os campos.');
  }

  // Adicionando usuário à lista (simulação)
  const novoUsuario = { nome, dataNascimento, nickname };
  usuariosCadastrados.push(novoUsuario);

  // Enviando uma resposta para confirmar o cadastro
  res.send('Usuário cadastrado com sucesso!');
});

// Rota para exibir o bate-papo
app.get('/bate-papo', (req, res) => {
    res.sendFile(__dirname + '/batePapo.html');
  });

  // Rota para postar uma mensagem no bate-papo
app.post('/postarMensagem', (req, res) => {
    const { usuario, mensagem } = req.body; // Capturando os dados da mensagem
  
    // Validação básica da mensagem
    if (!usuario || !mensagem) {
      return res.status(400).send('Por favor, preencha todos os campos.');
    }
  
    // Adicionar lógica para armazenar a mensagem e atualizar o bate-papo
    // ...
  
    // Responder com a página do bate-papo atualizada
    res.redirect('/bate-papo');
  });
  
// Rota para buscar as mensagens no servidor
app.get('/buscarMensagens', (req, res) => {
    // Aqui você buscaria as mensagens armazenadas no servidor (por exemplo, em um banco de dados)
    const mensagens = [
      { usuario: 'Usuário1', texto: 'Olá, tudo bem?' },
      { usuario: 'Usuário2', texto: 'Sim, e você?' },
      // ...
    ];
  
    res.json({ mensagens }); // Enviar as mensagens como resposta
  });
  
// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
