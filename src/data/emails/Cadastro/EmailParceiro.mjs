const EmailParceiro = (nome, codigoCasal) => {
    return `
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
                        <img src="D:\Documentos\Documents\Projetos\OneCash-back\src\public\logo_capa.png" alt="capa do aplicativo com fundo azul" class="imagem" />
                    </header>

                    <main class="container">
                        <h1>Confirmação de Cadastro</h1>
                        <p>Olá, {nome}</p>
                        <p>${nome} acaba de se cadastrar no aplicativo OneCash e te colocou como parceiro dele.
                            Seu código para se vincular a ele e criar o casal de vocês em nosso aplicativo é ${codigoCasal}.</p>
                        <p>Para se vincular basta baixar nosso aplicativo e ir em CADASTRE-SE - ATRIBUIÇÃO. Coloque lá o código recebido e realize o cadastro de sua própria conta.</p>
                    </main>

                    <footer class="footer">
                        <p>Este e-mail foi enviado automaticamente pelo nosso sistema. Não responda a este e-mail.</p>
                    </footer>
                </body>
            </html>`}

export default EmailParceiro
