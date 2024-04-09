-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Abr-2024 às 01:25
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
(29, 'Carteira', 0, 0, 'd0228c', 157),
(31, 'Banco Bradesco ', 1, 4559.43, 'd0228c', NULL),
(32, 'Banco do Brasil - CC', 0, 125.83, 'd0228c', 157),
(33, 'Banco do Brasil - CP', 0, 7693.57, 'd0228c', 157),
(34, 'Investimentos Toro', 0, 6398.91, 'd0228c', 157),
(35, 'NuBank ', 0, 0.2, 'd0228c', 157),
(36, 'Carteira', 0, 0, '6d8b97', 158),
(37, 'Nossa Conta', 1, 0, '6d8b97', 158),
(38, 'Carteira', 0, 0, '6d8b97', 159),
(39, 'Bradesco', 1, 500, '6d8b97', NULL),
(44, 'NuBank', 0, 5000, '6d8b97', 158),
(46, 'Carteira', 0, 0, 'd0228c', 175),
(47, 'Nubank', 0, 1731.15, 'd0228c', 175),
(48, 'Empréstimos ', 0, 150, 'd0228c', 157);

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
(39, 'd0228c', 157, 175),
(40, '6d8b97', 158, 159);

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
(97, 'Alimentação', 0, 2, 21, 'd0228c'),
(98, 'Moradia', 0, 3, 27, 'd0228c'),
(99, 'Transporte', 0, 4, 16, 'd0228c'),
(100, 'Saúde', 0, 5, 29, 'd0228c'),
(101, 'Educação', 0, 6, 11, 'd0228c'),
(102, 'Lazer', 0, 7, 28, 'd0228c'),
(103, 'Roupas e Acessórios', 0, 8, 33, 'd0228c'),
(104, 'Água/Luz/Internet', 0, 9, 39, 'd0228c'),
(105, 'Despesas Diversas', 0, 10, 36, 'd0228c'),
(106, 'Salário', 1, 11, 38, 'd0228c'),
(107, 'Rendimentos', 1, 12, 37, 'd0228c'),
(108, 'Presentes', 1, 13, 26, 'd0228c'),
(109, 'Vales', 1, 14, 31, 'd0228c'),
(110, 'Alimentação', 0, 6, 21, '6d8b97'),
(111, 'Moradia', 0, 13, 27, '6d8b97'),
(113, 'Saúde', 0, 11, 29, '6d8b97'),
(114, 'Educação', 0, 6, 11, '6d8b97'),
(115, 'Lazer', 0, 7, 28, '6d8b97'),
(116, 'Roupas e Acessórios', 0, 8, 33, '6d8b97'),
(117, 'Água/Luz/Internet', 0, 9, 24, '6d8b97'),
(118, 'Despesas Qualquer', 0, 2, 36, '6d8b97'),
(119, 'Salário', 1, 11, 38, '6d8b97'),
(120, 'Rendimentos', 1, 12, 37, '6d8b97'),
(121, 'Presentes', 1, 13, 26, '6d8b97'),
(122, 'Vales', 1, 14, 31, '6d8b97'),
(123, 'Vendas ', 1, 3, 17, '6d8b97'),
(126, 'Teste', 1, 21, 37, '6d8b97'),
(127, 'Receitas Diversas', 1, 15, 37, 'd0228c');

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
  `status` tinyint(1) DEFAULT NULL COMMENT '0: pendente\r\n1: recebida',
  `casal` varchar(10) NOT NULL,
  `usuario` int(50) DEFAULT NULL,
  `dia` int(11) NOT NULL,
  `mes` int(2) NOT NULL,
  `ano` int(4) NOT NULL,
  `categoria` int(11) NOT NULL,
  `tipo` int(2) NOT NULL COMMENT '0: individual\r\n1: coletiva',
  `compra` int(11) DEFAULT NULL,
  `banco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `despesa`
--

INSERT INTO `despesa` (`id`, `descricao`, `valor`, `status`, `casal`, `usuario`, `dia`, `mes`, `ano`, `categoria`, `tipo`, `compra`, `banco`) VALUES
(25, 'Aluguel', 650, 0, '6d8b97', 158, 21, 2, 2024, 111, 1, NULL, 44),
(26, 'Camisa', 98.63, 0, '6d8b97', 158, 21, 2, 2024, 116, 0, NULL, 44),
(27, 'Gel', 15, 0, '6d8b97', 158, 21, 2, 2024, 118, 0, NULL, 44),
(28, 'Tênis', 150, 0, '6d8b97', 158, 21, 2, 2024, 116, 0, NULL, 44),
(30, 'Água ', 100, 0, '6d8b97', 158, 21, 2, 2024, 117, 1, NULL, 44),
(31, 'Internet ', 99.9, 0, '6d8b97', 158, 21, 2, 2024, 117, 1, NULL, 44),
(32, 'Saida', 96, 0, '6d8b97', 158, 21, 2, 2024, 115, 1, NULL, 44),
(35, 'Coca pesqueiro ', 6, 0, 'd0228c', 157, 22, 2, 2024, 97, 0, NULL, 32),
(36, 'Julie Supermercado ', 23.31, 0, 'd0228c', 157, 23, 2, 2024, 97, 0, NULL, 32),
(37, 'Máquina de lavar', 2098.48, 0, 'd0228c', 157, 25, 2, 2024, 98, 1, NULL, 31),
(41, 'Aluguel', 500, 0, '6d8b97', 158, 5, 3, 2024, 111, 1, NULL, 36),
(42, 'Sorvete', 7, 0, '6d8b97', 158, 5, 3, 2024, 110, 0, NULL, 36),
(44, 'Julie Supermercado ', 22.98, 0, 'd0228c', 157, 26, 2, 2024, 97, 0, NULL, 32),
(45, 'Guina', 5.5, 0, 'd0228c', 157, 26, 2, 2024, 97, 0, NULL, 32),
(46, 'Rifa IEAD Santa Luzia ', 10, 0, 'd0228c', 157, 30, 2, 2024, 102, 0, NULL, 32),
(48, 'Gasolina', 30, 0, 'd0228c', 157, 5, 3, 2024, 99, 0, NULL, 32),
(49, 'Aluguel ', 500, 0, 'd0228c', 157, 8, 3, 2024, 98, 1, NULL, 32),
(50, 'Transporte Faculdade ', 300, 0, 'd0228c', 157, 8, 3, 2024, 99, 0, NULL, 32),
(51, 'Coxinha Ivaiporã ', 10, 0, 'd0228c', 157, 9, 3, 2024, 97, 0, NULL, 32),
(52, 'Fini Ivaiporã ', 9.98, 0, 'd0228c', 157, 6, 3, 2024, 97, 0, NULL, 32),
(53, 'Gasolina Sérgio ', 10, 0, 'd0228c', 157, 9, 3, 2024, 99, 0, NULL, 32),
(54, 'Almoço Ivaiporã ', 37, 0, 'd0228c', 157, 6, 3, 2024, 97, 0, NULL, 32),
(55, 'Almoço Thâmily', 37, 0, 'd0228c', 157, 6, 3, 2024, 97, 0, NULL, 32),
(56, 'Academia ', 70, 0, 'd0228c', 157, 9, 3, 2024, 100, 0, NULL, 32),
(57, 'Julie Supermercado ', 35.28, 0, 'd0228c', 157, 8, 3, 2024, 97, 0, NULL, 32);

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
  `tipo` int(2) NOT NULL COMMENT '0: individual\r\n1: coletiva',
  `dia` int(2) NOT NULL,
  `mes` int(2) NOT NULL,
  `ano` int(4) NOT NULL,
  `banco` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `receita`
--

INSERT INTO `receita` (`id`, `descricao`, `valor`, `categoria`, `usuario`, `casal`, `status`, `tipo`, `dia`, `mes`, `ano`, `banco`) VALUES
(90, 'Mais testes', 500, 119, 159, '6d8b97', 0, 0, 5, 3, 2024, 38),
(92, 'Salário', 2000, 119, 158, '6d8b97', 0, 0, 5, 3, 2024, 36),
(93, 'Caixa de Som Alex', 67.56, 127, 157, 'd0228c', 0, 0, 5, 3, 2024, 31),
(94, 'Dinheiro ', 1200, 123, 158, '6d8b97', 0, 0, 5, 3, 2024, 44),
(95, 'Reajuste de Saldo', 30.67, 127, 157, 'd0228c', 0, 0, 5, 3, 2024, 32),
(97, 'Reajuste de Saldo', 5.23, 127, 157, 'd0228c', 0, 0, 5, 3, 2024, 31),
(98, 'Ajuste de Saldo', 24.04, 127, 157, 'd0228c', 0, 0, 5, 3, 2024, 34),
(100, 'Reajuste de Saldo ', 9.87, 127, 157, 'd0228c', 0, 0, 5, 3, 2024, 33),
(101, 'Salário Abril', 1546.85, 106, 157, 'd0228c', 0, 0, 5, 3, 2024, 32);

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
-- Estrutura da tabela `transferencias`
--

CREATE TABLE `transferencias` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `valor` float NOT NULL,
  `casal` varchar(10) NOT NULL,
  `usuario` int(50) DEFAULT NULL,
  `dia` int(11) NOT NULL,
  `mes` int(2) NOT NULL,
  `ano` int(4) NOT NULL,
  `tipo` int(2) NOT NULL COMMENT '0: débito\r\n1: crédito',
  `banco_origem` int(11) NOT NULL,
  `banco_destino` int(11) NOT NULL,
  `relacao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `transferencias`
--

INSERT INTO `transferencias` (`id`, `descricao`, `valor`, `casal`, `usuario`, `dia`, `mes`, `ano`, `tipo`, `banco_origem`, `banco_destino`, `relacao`) VALUES
(78, 'Transferência saída', 1500, '6d8b97', 158, 4, 2, 2024, 0, 37, 36, 79),
(79, 'Transferência entrada', 1500, '6d8b97', 158, 4, 2, 2024, 1, 36, 37, 78),
(80, 'Transferência saída', 1500, '6d8b97', 158, 9, 3, 2024, 0, 44, 37, 81),
(81, 'Transferência entrada', 1500, '6d8b97', 158, 9, 3, 2024, 1, 37, 44, 80);

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
(157, 'Gideone Lacerda ', 'gideonilacerda@gmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'd0228c', 'thamilyfelizardo532@gmail.com', '2024-03-21 19:01:25', '2024-04-09 14:23:38'),
(158, 'Admin', 'tester@teste.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '6d8b97', 'parceiro@qualquer.com', '2024-03-21 19:43:33', '2024-04-09 14:51:05'),
(159, 'Parceiro', 'parceiro@qualquer.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '6d8b97', '', '2024-03-21 19:48:08', '2024-04-05 01:21:43'),
(175, 'Thamily felizardo ', 'thamilyfelizardo532@gmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', 'd0228c', '', '2024-03-23 20:33:37', '2024-04-05 14:56:28');

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
  ADD UNIQUE KEY `usuario_princ` (`usuario_princ`),
  ADD UNIQUE KEY `usuario_sec` (`usuario_sec`),
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
  ADD KEY `fk_despesa_col_banco` (`banco`),
  ADD KEY `fk_despesa_usuario` (`usuario`);

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
  ADD KEY `fk_receita_categoria` (`categoria`),
  ADD KEY `fk_receita_banco` (`banco`);

--
-- Índices para tabela `senha_temp`
--
ALTER TABLE `senha_temp`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `transferencias`
--
ALTER TABLE `transferencias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `relacao` (`relacao`),
  ADD KEY `fk_transf_casal` (`casal`),
  ADD KEY `fk_tranf_usuario` (`usuario`),
  ADD KEY `fk_transf_banco_origem` (`banco_origem`),
  ADD KEY `fk_transf_banco_destino` (`banco_destino`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de tabela `casal`
--
ALTER TABLE `casal`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de tabela `categoria_tr`
--
ALTER TABLE `categoria_tr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT de tabela `cor`
--
ALTER TABLE `cor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `despesa`
--
ALTER TABLE `despesa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT de tabela `senha_temp`
--
ALTER TABLE `senha_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `transferencias`
--
ALTER TABLE `transferencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

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
  ADD CONSTRAINT `fk_despesa_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria_tr` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_despesa_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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

--
-- Limitadores para a tabela `receita`
--
ALTER TABLE `receita`
  ADD CONSTRAINT `fk_receita_banco` FOREIGN KEY (`banco`) REFERENCES `banco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_receita_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria_tr` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_receita_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `transferencias`
--
ALTER TABLE `transferencias`
  ADD CONSTRAINT `fk_tranf_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transf_banco_destino` FOREIGN KEY (`banco_destino`) REFERENCES `banco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transf_banco_origem` FOREIGN KEY (`banco_origem`) REFERENCES `banco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_transf_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
