-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Mar-2024 às 01:47
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
  `tipo` tinyint(1) NOT NULL COMMENT '1: individual\r\n2: conjunta',
  `saldo_inicial` float NOT NULL,
  `casal` varchar(10) NOT NULL,
  `usuario` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `banco`
--

INSERT INTO `banco` (`id`, `nome`, `tipo`, `saldo_inicial`, `casal`, `usuario`) VALUES
(16, 'Bradesco', 2, 5000, '74665ecf', 0),
(17, 'Banco do Brasil', 1, 1500.75, '74665ecf', 133);

-- --------------------------------------------------------

--
-- Estrutura da tabela `casal`
--

CREATE TABLE `casal` (
  `id` int(255) NOT NULL,
  `cod_casal` varchar(255) NOT NULL,
  `usuario_princ` int(255) NOT NULL,
  `usuario_sec` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `casal`
--

INSERT INTO `casal` (`id`, `cod_casal`, `usuario_princ`, `usuario_sec`) VALUES
(32, '74665ecf', 133, 134),
(33, '237feb85', 137, 138);

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
(18, 'Dinheiro', 1, 3, 12, '74665ecf'),
(24, 'Salário', 1, 4, 37, '74665ecf'),
(29, 'Comida', 0, 3, 21, '74665ecf'),
(30, 'Energia ', 0, 3, 24, '74665ecf'),
(31, 'sa', 0, 2, 36, '74665ecf'),
(32, 'Vale Alimentação', 1, 6, 31, '74665ecf'),
(42, 'Presente ', 1, 10, 26, '74665ecf');

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

--
-- Extraindo dados da tabela `despesa`
--

INSERT INTO `despesa` (`id`, `descricao`, `valor`, `status`, `casal`, `usuario`, `dia`, `mes`, `ano`, `categoria`, `tipo`, `compra`, `banco`) VALUES
(15, 'Editado', 250.69, 0, '74665ecf', 0, 14, 2, 2024, 31, 0, 0, 16),
(16, 'Aluguel', 500, 0, '74665ecf', 0, 14, 2, 2024, 29, 0, 0, 16);

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
(65, 'Salário', 5890.67, 39, 133, '74665ecf', 0, 0, 14, 2, 2024, 17),
(66, 'Editado', 250.69, 31, 133, '74665ecf', 0, 0, 14, 2, 2024, 16),
(67, 'Vale', 610, 32, 133, '74665ecf', 0, 0, 14, 2, 2024, 16),
(68, 'Salário', 2.5, 24, 133, '74665ecf', 0, 0, 14, 2, 2024, 16),
(69, 'Teste da madrugada ', 666, 18, 133, '74665ecf', 0, 0, 14, 2, 2024, 17);

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
(133, 'Gideone', 'gideonilacerda@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '74665ecf', 'gideonilc@hotmail.com', '2024-03-05 16:10:29', '2024-03-14 20:40:58'),
(134, 'Thamy', 'gideonilc@hotmail.com', '221b37fcdb52d0f7c39bbd0be211db0e1c00ca5fbecd5788780463026c6b964b', '74665ecf', '', '2024-03-05 16:12:37', '0000-00-00 00:00:00'),
(137, 'Gideone 2', 'gideonelacerda@hotmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '237feb85', 'thamy@email.com', '2024-02-26 11:37:00', '2024-03-07 17:31:37'),
(138, 'Thamilly', 'thamy@email.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '237feb85', 'gideonilacerda@hotmail.com', '2024-03-07 16:22:55', '2024-03-07 14:43:08');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `banco`
--
ALTER TABLE `banco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_banco_casal` (`casal`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `casal`
--
ALTER TABLE `casal`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `categoria_tr`
--
ALTER TABLE `categoria_tr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de tabela `senha_temp`
--
ALTER TABLE `senha_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `banco`
--
ALTER TABLE `banco`
  ADD CONSTRAINT `fk_banco_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
