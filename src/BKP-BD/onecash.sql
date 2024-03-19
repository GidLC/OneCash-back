-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Mar-2024 às 01:19
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `onecash`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `banco`
--

CREATE TABLE `banco` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '0: individual\r\n1: conjunta',
  `saldo_inicial` float NOT NULL,
  `casal` varchar(10) NOT NULL,
  `usuario` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `banco`
--

INSERT INTO `banco` (`id`, `nome`, `tipo`, `saldo_inicial`, `casal`, `usuario`) VALUES
(19, 'Carteira', 0, 0, '2c994a', 152),
(20, 'Nossa Conta', 1, 0, '2c994a', 152),
(21, 'Carteira', 0, 0, '2c994a', 153);

-- --------------------------------------------------------

--
-- Estrutura da tabela `casal`
--

CREATE TABLE `casal` (
  `id` int(255) NOT NULL,
  `cod_casal` varchar(255) NOT NULL,
  `usuario_princ` int(255) NOT NULL,
  `usuario_sec` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `casal`
--

INSERT INTO `casal` (`id`, `cod_casal`, `usuario_princ`, `usuario_sec`) VALUES
(37, '2c994a', 152, 153);

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria_tr`
--

CREATE TABLE `categoria_tr` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '0: despesa\r\n1: receita',
  `cor` int(11) NOT NULL,
  `icone` int(11) NOT NULL,
  `casal` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `categoria_tr`
--

INSERT INTO `categoria_tr` (`id`, `nome`, `tipo`, `cor`, `icone`, `casal`) VALUES
(70, 'Alimentação', 0, 2, 21, '2c994a'),
(71, 'Moradia', 0, 3, 27, '2c994a'),
(72, 'Transporte', 0, 4, 16, '2c994a'),
(73, 'Saúde', 0, 21, 29, '2c994a'),
(74, 'Educação', 0, 6, 11, '2c994a'),
(75, 'Lazer', 0, 7, 28, '2c994a'),
(76, 'Roupas e Acessórios', 0, 8, 33, '2c994a'),
(77, 'Água/Luz/Internet', 0, 9, 39, '2c994a'),
(78, 'Despesas Diversas', 0, 10, 36, '2c994a'),
(79, 'Salário', 1, 11, 38, '2c994a'),
(80, 'Rendimentos', 1, 12, 37, '2c994a'),
(81, 'Presentes', 1, 13, 26, '2c994a'),
(82, 'Vales', 1, 14, 31, '2c994a');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cor`
--

CREATE TABLE `cor` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `codigo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cor`
--

INSERT INTO `cor` (`id`, `nome`, `codigo`) VALUES
(1, 'Branco', '#FFFFFF'),
(2, 'Vermelho', '#FF0000'),
(3, 'Verde', '#00FF00'),
(4, 'Azul', '#0000FF'),
(5, 'Amarelo', '#FFFF00'),
(6, 'Roxo', '#800080'),
(7, 'Ciano', '#00FFFF'),
(8, 'Laranja', '#FFA500'),
(9, 'Rosa', '#FFC0CB'),
(10, 'Turquesa', '#40E0D0'),
(11, 'Dourado', '#FFD700'),
(12, 'Prata', '#C0C0C0'),
(13, 'Marrom', '#A52A2A'),
(14, 'Índigo', '#4B0082'),
(15, 'Lima', '#00FF00'),
(16, 'Tomate', '#FF6347'),
(17, 'Chocolate', '#D2691E'),
(18, 'Oliva', '#808000'),
(19, 'Orquídea', '#DA70D6'),
(20, 'Salmão', '#FA8072'),
(21, 'Íris', '#5A4FCF');

-- --------------------------------------------------------

--
-- Estrutura da tabela `despesa`
--

CREATE TABLE `despesa` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `valor` float NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0: pendente\r\n1: recebida',
  `casal` varchar(10) NOT NULL,
  `usuario` int(50) NOT NULL,
  `dia` int(11) NOT NULL,
  `mes` int(2) NOT NULL,
  `ano` int(4) NOT NULL,
  `categoria` int(11) NOT NULL,
  `tipo` int(2) NOT NULL COMMENT '1: individual\r\n2: coletiva',
  `compra` int(11) NOT NULL,
  `banco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `icones`
--

CREATE TABLE `icones` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `ion_nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `icones`
--

INSERT INTO `icones` (`id`, `nome`, `ion_nome`) VALUES
(1, 'aviao', 'airplaneOutline'),
(2, 'bola', 'americanFootballOutline'),
(3, 'grafico', 'analyticsOutline'),
(4, 'mala', 'bagHandleOutline'),
(5, 'grafBar', 'barChartOutline'),
(6, 'barraAcad', 'barbellOutline'),
(7, 'codBarras', 'barcodeOutline'),
(8, 'cama', 'bedOutline'),
(9, 'cerveja', 'beerOutline'),
(10, 'bicicleta', 'bicycleOutline'),
(11, 'livro', 'bookOutline'),
(12, 'malaWork', 'briefcaseOutline'),
(13, 'ferramenta', 'buildOutline'),
(14, 'onibus', 'busOutline'),
(15, 'telefone', 'callOutline'),
(16, 'carro', 'carOutline'),
(17, 'cartao', 'cardOutline'),
(18, 'marteloChave', 'constructOutline'),
(19, 'tesoura', 'cutOutline'),
(20, 'tela', 'desktopOutline'),
(21, 'comida', 'fastFoodOutline'),
(22, 'filme', 'filmOutline'),
(23, 'coracaoFit', 'fitnessOutline'),
(24, 'flash', 'flashOutline'),
(25, 'game', 'gameControllerOutline'),
(26, 'presente', 'giftOutline'),
(27, 'casa', 'homeOutline'),
(28, 'sorvete', 'iceCreamOutline'),
(29, 'kitMedico', 'medkitOutline'),
(30, 'musica', 'musicalNoteOutline'),
(31, 'colherFaca', 'restaurantOutline'),
(32, 'escola', 'schoolOutline'),
(33, 'camiseta', 'shirtOutline'),
(34, 'cinema', 'ticketOutline'),
(35, 'sombrinha', 'umbrellaOutline'),
(36, 'setaBaixo', 'trendingDownOutline'),
(37, 'setaCima', 'trendingUpOutline'),
(38, 'carteira', 'walletOutline'),
(39, 'wifi', 'wifiOutline');

-- --------------------------------------------------------

--
-- Estrutura da tabela `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `acao` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `objetivo`
--

CREATE TABLE `objetivo` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `valor` float NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0: Pendente\r\n1: Concluido',
  `prazo` date NOT NULL,
  `casal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `receita`
--

CREATE TABLE `receita` (
  `id` int(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `valor` float NOT NULL,
  `categoria` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `casal` varchar(8) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0: pendente\r\n1: recebida',
  `tipo` int(2) NOT NULL COMMENT '1: individual\r\n2: coletiva',
  `dia` int(2) NOT NULL,
  `mes` int(2) NOT NULL,
  `ano` int(4) NOT NULL,
  `banco` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `receita`
--

INSERT INTO `receita` (`id`, `descricao`, `valor`, `categoria`, `usuario`, `casal`, `status`, `tipo`, `dia`, `mes`, `ano`, `banco`) VALUES
(70, 'Teste', 500, 79, 152, '2c994a', 0, 0, 18, 2, 2024, 19),
(72, 'vale', 616, 82, 152, '2c994a', 1, 0, 18, 2, 2024, 19);

-- --------------------------------------------------------

--
-- Estrutura da tabela `senha_temp`
--

CREATE TABLE `senha_temp` (
  `id` int(11) NOT NULL,
  `id_usuario` int(100) NOT NULL,
  `token` varchar(10) NOT NULL,
  `validade` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(254) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(64) NOT NULL,
  `casal` varchar(8) NOT NULL,
  `email_parceiro` varchar(50) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `ultimo_acesso` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `casal`, `email_parceiro`, `dt_criacao`, `ultimo_acesso`) VALUES
(152, 'Gideone', 'gideonilacerda@gmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '2c994a', 'gideonilc@hotmail.com', '2024-03-18 20:31:55', '2024-03-18 21:44:44'),
(153, 'Thâmily ', 'gideonilc@hotmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '2c994a', '', '2024-03-18 20:34:51', '2024-03-18 20:36:21');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `banco`
--
ALTER TABLE `banco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_banco_casal` (`casal`),
  ADD KEY `fk_banco_usuario` (`usuario`);

--
-- Índices para tabela `casal`
--
ALTER TABLE `casal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod_casal` (`cod_casal`),
  ADD KEY `fk_usuario_princ_casal` (`usuario_princ`),
  ADD KEY `fk_usuario_sec_casal` (`usuario_sec`);

--
-- Índices para tabela `categoria_tr`
--
ALTER TABLE `categoria_tr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categoria_tr_cor` (`cor`),
  ADD KEY `fk_categoria_tr_casal` (`casal`),
  ADD KEY `fk_categoria_tr_icone` (`icone`);

--
-- Índices para tabela `cor`
--
ALTER TABLE `cor`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `despesa`
--
ALTER TABLE `despesa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_despesa_col_casal` (`casal`),
  ADD KEY `fk_despesa_col_categoria` (`categoria`),
  ADD KEY `fk_despesa_col_banco` (`banco`);

--
-- Índices para tabela `icones`
--
ALTER TABLE `icones`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_log` (`usuario`);

--
-- Índices para tabela `objetivo`
--
ALTER TABLE `objetivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_objetivo_casal` (`casal`);

--
-- Índices para tabela `receita`
--
ALTER TABLE `receita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_receita_usuario` (`usuario`),
  ADD KEY `fk_receita_casal` (`casal`),
  ADD KEY `fk_receita_categoria_tr` (`categoria`),
  ADD KEY `fk_receita_banco` (`banco`);

--
-- Índices para tabela `senha_temp`
--
ALTER TABLE `senha_temp`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email_usuario` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `banco`
--
ALTER TABLE `banco`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `casal`
--
ALTER TABLE `casal`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de tabela `categoria_tr`
--
ALTER TABLE `categoria_tr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de tabela `cor`
--
ALTER TABLE `cor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `despesa`
--
ALTER TABLE `despesa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `icones`
--
ALTER TABLE `icones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de tabela `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `objetivo`
--
ALTER TABLE `objetivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `receita`
--
ALTER TABLE `receita`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de tabela `senha_temp`
--
ALTER TABLE `senha_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `banco`
--
ALTER TABLE `banco`
  ADD CONSTRAINT `fk_banco_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_banco_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `casal`
--
ALTER TABLE `casal`
  ADD CONSTRAINT `fk_usuario_princ_casal` FOREIGN KEY (`usuario_princ`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_sec_casal` FOREIGN KEY (`usuario_sec`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `categoria_tr`
--
ALTER TABLE `categoria_tr`
  ADD CONSTRAINT `fk_categoria_tr_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_categoria_tr_cor` FOREIGN KEY (`cor`) REFERENCES `cor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_categoria_tr_icone` FOREIGN KEY (`icone`) REFERENCES `icones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `despesa`
--
ALTER TABLE `despesa`
  ADD CONSTRAINT `fk_despesa_banco` FOREIGN KEY (`banco`) REFERENCES `banco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_despesa_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_despesa_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria_tr` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `objetivo`
--
ALTER TABLE `objetivo`
  ADD CONSTRAINT `fk_objetivo_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
