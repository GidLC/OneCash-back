const EmailCadastro = (nome, codigoCasal) =>  {return `
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmação de Cadastro</title>
                <style>
                    body {
                        font - family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
}
                    .container {
                        max - width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
                    h1 {
                        color: #333333;
}
                    p {
                        color: #666666;
}
                    .button {
                        display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
}
                    .footer {
                        margin - top: 20px;
                    text-align: center;
                    color: #999999;
}
                    .cabecalho {
                        display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: -2%;
}
                    .imagem {
                        width: 640px;
                    height: 200px;
}
                </style>
            </head>
            <body>
                <header class="cabecalho">
                    <img src="https://drive.google.com/file/d/1sKsHJofU4qCgCOgRnN1hvS1mrb4ogkf0/edit" alt="capa do aplicativo com fundo azul" class="imagem" />
                </header>

                <h1>Confirmação de Cadastro</h1>
                <p>Olá, ${nome}</p>
                <p>Você acaba de se cadastrar no OneCash, o melhor aplicativo de finanças familiar. O código casal seu e de seu(sua) parceiro(a) é o ${codigoCasal}.
                    Seu parceiro(a) vai precisar dele para se vincular a você, mas não se preocupe já enviamos pra ele(a) também</p>
                <p>Se você não solicitou este cadastro, por favor, ignore este e-mail.</p>

                <footer class="footer">
                    <p>Este e-mail foi enviado automaticamente pelo nosso sistema. Não responda a este e-mail.</p>
                </footer>
            </body>
        </html>`}

export default EmailCadastro