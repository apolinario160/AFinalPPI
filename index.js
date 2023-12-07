import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host = '0.0.0.0';

function processaCadastroUsuario(requisicao, resposta) {
  //Extrair os dados do corpo da requisição, além de validar os dados.
  const dados = requisicao.body;

  let conteudoResposta = ``;
  //è necessario validar os dados enviados
  //A validação dos dados e de responsabilidade da aplição servidora

  if (!(dados.nome && dados.sobrenome && dados.nomeUsuario
      && dados.cidade && dados.uf)) {
      //Estão faltando dados do usuário!
      conteudoResposta = `
          <!DOCTYPE html>
          <html lang="pt-br">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Cadastro de usuario</title>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          </head>
          <body>
              <div class="container">
                  <form action='/cadastrarUsuario' method='POST'  class="row g-3 needs-validation" novalidate>
                      <fieldset class="border p-2">
                          <legend class="mb-3">Cadastro de usúario</legend>
                      
                      <div class="col-md-4">
                        <label for="validationCustom01" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" value ="${dados.nome}"required>
                      </div>    
          
          `;
      if (!dados.nome) {
          conteudoResposta += `
                                      <div>
                                          <p class = "text-danger">Por favor, informe o nome!</p>
                                      </div>
              `;
      }

      conteudoResposta += `
              <div class="col-md-4">
                  <label for="nickname" class="form-label">Nickname</label>
                 <input type="text" class="form-control" id="nickname" name="nickname" value="${dados.nicknome}" required>
               </div>

              `;
      if (!dados.nicknome) {
          conteudoResposta += `
              <div>
                  <p class = "text-danger">Por favor, informe o Nickname!</p>
              </div>
              `;
      }

      conteudoResposta += `
      <div class="col-md-3">
        <label for="dataNascimento" class="form-label">Data de Nascimento</label>
        <input type="text" class="form-control" id="dataNascimento" name="dataNascimento" value=${dados.dataNascimento}" required>
      </div>  `;

      if (!dados.dataNascimento) {
          conteudoResposta += `
          <div>
          <p class = "text-danger">Por favor, informe a Data de Nascimento!</p>
          </div>`;
      }
      conteudoResposta += `
      <div class="col-12 mt-3">
       <button class="btn btn-primary" type="submit">Cadastrar</button>
       </div>
  </fieldset>
</form>
</div>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
crossorigin="anonymous"></script>

</body>

</html>`;
      resposta.end(conteudoResposta);


  }
  else {

      const usuario = {
          nome: dados.nome,
          sobrenome: dados.sobrenome,
          datanascimento: dados.dataNascimento,

      }
      //Indica um  novo usuário na lista de usuários ja cadastrado
      listaUsuarios.push(usuario);
      //retornar a lista de usuário
      conteudoResposta = `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <title>Menu do Sistema
    </title>
  </head>
  <body>
      <h1>Lista de usuários cadastrados</h1>
      <table class="table table-striped table-hover">
          <thead>
              <tr>
                  <th>Nome</th>
                  <th>Nickname</th>
                  <th>Data de Nascimento</th>

              </tr>
          </thead>
          <tbody>`;

      for (const usuario of listaUsuarios) {
          conteudoResposta += `
                  <tr>
                      <td>${usuario.nome}</td>
                      <td>${usuario.nicknome}</td>
                      <td>${usuario.dataNascimento}</td>

                  </tr>
              
              
              `;
      }
      conteudoResposta += `
              </tbody>
          </table>
          <a class="btn btn-primary" href="/" role="button">Voltar ao Menu...</a>
          <a class="btn btn-primary" href="/cadastraUsuario.html" role="button">Continuar cadastrando</a>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>

   </html>`;

      resposta.end(conteudoResposta);
  } // fim do if/else...
}

const app = express();
app.use(cookieParser());

app.use(session({
  secret: "M1nH4Ch4v3S3cR3t4", 
  resave: true, // atualiza a sessão mesmo que não há alterações a cada requisição 
  saveUninitialized: true, 
  cookie: {
      //tempo de vida
      maxAge: 1000 * 60 *15 // 15 minutos 
  }
}));


app.use(express.urlencoded({extended: true}));

app.get( '/', autenticar, (requisicao, resposta) => {


  const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
  const data  = new Date ();
  resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
      maxAge : 1000 * 60 * 60 * 24 * 30,
      httpOnly : true
  });
  resposta.end(`
  <!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Menu do Sistema
</title>
</head>
<body>
<h1>MENU</h1>
<ul>
  <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
</ul>
</body>
  <footer>
      <p> Seu último acesso foi em ${dataUltimoAcesso}</p>
  </footer>
</html>
  `)
});

//endopoint login que ira processar o login da aplicação
app.post('/login', (requisicao, resposta) => {
  const usuario = requisicao.body.usuario;
  const senha  = requisicao.body.senha;


  if( usuario && senha && (usuario ==='tiago') && (senha === '123')){
      requisicao.session.usuarioAutenticado = true;
      resposta.redirect('/');


  }
  else{
      resposta.end(`
          <!DOCTYPE html>
              <head>
                  <meta charset="UTF-8">
                  <title>Falha na autenticação</title>
              </head>
              <body>
                  <h1>Usuário ou senha inválido!</h1>
                  <a href = "/login.html"> Voltar ao  login</a>
              </body>
          
           </html>
      
      `);
  }
})

//Rota para processar o cadastro de usuário endpoint ='/cadastraUsuario'

app.post( '/cadastrarUsuario', autenticar, processaCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});