-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/05/2024 às 04:17
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

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
-- Estrutura para tabela `aporte_objetivo`
--

CREATE TABLE `aporte_objetivo` (
  `id` int(11) NOT NULL,
  `valor` float NOT NULL,
  `objetivo` int(11) NOT NULL,
  `casal` varchar(20) NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `aporte_objetivo`
--

INSERT INTO `aporte_objetivo` (`id`, `valor`, `objetivo`, `casal`, `data`) VALUES
(3, 67.98, 4, '6d8b97', '2024-05-23'),
(4, 159.56, 4, '6d8b97', '2024-05-23'),
(5, 350, 4, '6d8b97', '2024-05-23'),
(7, 200, 8, '6d8b97', '2024-05-23'),
(9, 2000, 4, '6d8b97', '2024-05-23'),
(10, 2.5, 15, '6d8b97', '2024-05-23'),
(11, 250, 8, '6d8b97', '2024-05-23'),
(14, 950, 8, '6d8b97', '2024-05-23'),
(15, 8000, 6, '6d8b97', '2024-05-23'),
(16, 2000, 6, '6d8b97', '2024-05-23');

-- --------------------------------------------------------

--
-- Estrutura para tabela `banco`
--

CREATE TABLE `banco` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '0: individual\r\n1: conjunta',
  `saldo_inicial` float NOT NULL,
  `casal` varchar(10) NOT NULL,
  `usuario` int(50) DEFAULT NULL,
  `arquivo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `banco`
--

INSERT INTO `banco` (`id`, `nome`, `tipo`, `saldo_inicial`, `casal`, `usuario`, `arquivo`) VALUES
(36, 'Carteira', 0, 1541.01, '6d8b97', 158, 0),
(37, 'Nossa Conta', 1, -17850, '6d8b97', 158, 1),
(38, 'Carteira', 0, 0, '6d8b97', 159, 0),
(39, 'Bradesco', 1, 2500, '6d8b97', NULL, 0),
(44, 'NuBank', 0, 4909.53, '6d8b97', 158, 0),
(51, 'Itaú', 0, 7275.11, '6d8b97', 158, 0),
(52, 'Bradesco', 0, 11.96, '6d8b97', 158, 1),
(53, 'Carteira', 0, 0, '4aa97f', 180, 0),
(54, 'Nossa Conta', 1, 0, '4aa97f', 180, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `casal`
--

CREATE TABLE `casal` (
  `id` int(255) NOT NULL,
  `cod_casal` varchar(255) NOT NULL,
  `usuario_princ` int(255) NOT NULL,
  `usuario_sec` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `casal`
--

INSERT INTO `casal` (`id`, `cod_casal`, `usuario_princ`, `usuario_sec`) VALUES
(40, '6d8b97', 158, 159),
(42, '4aa97f', 180, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria_tr`
--

CREATE TABLE `categoria_tr` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '0: despesa\r\n1: receita',
  `cor` int(11) NOT NULL,
  `icone` int(11) NOT NULL,
  `casal` varchar(15) NOT NULL,
  `cat_sistema` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria_tr`
--

INSERT INTO `categoria_tr` (`id`, `nome`, `tipo`, `cor`, `icone`, `casal`, `cat_sistema`) VALUES
(111, 'Moradia', 0, 16, 27, '6d8b97', 0),
(113, 'Saúde', 0, 11, 29, '6d8b97', 0),
(116, 'Roupas e Acessórios', 0, 8, 33, '6d8b97', 0),
(117, 'Água/Luz/Internet', 0, 9, 24, '6d8b97', 0),
(119, 'Salário', 1, 11, 5, '6d8b97', 0),
(122, 'Vales', 1, 14, 31, '6d8b97', 0),
(123, 'Vendas ', 1, 3, 38, '6d8b97', 0),
(141, '*Ajuste*', 0, 2, 36, '6d8b97', 1),
(142, '*Ajuste*', 1, 3, 37, '6d8b97', 1),
(144, 'Despesas Diversas ', 0, 16, 36, '6d8b97', 0),
(148, 'Lazer', 0, 12, 25, '6d8b97', 0),
(153, 'Alimentação', 0, 2, 21, '4aa97f', NULL),
(154, 'Moradia', 0, 3, 27, '4aa97f', NULL),
(155, 'Transporte', 0, 4, 16, '4aa97f', NULL),
(156, 'Saúde', 0, 5, 29, '4aa97f', NULL),
(157, 'Educação', 0, 6, 11, '4aa97f', NULL),
(158, 'Lazer', 0, 7, 28, '4aa97f', NULL),
(159, 'Roupas e Acessórios', 0, 8, 33, '4aa97f', NULL),
(160, 'Água/Luz/Internet', 0, 9, 39, '4aa97f', NULL),
(161, 'Despesas Diversas', 0, 10, 36, '4aa97f', NULL),
(162, '*Ajuste*', 0, 2, 36, '4aa97f', NULL),
(163, 'Salário', 1, 11, 38, '4aa97f', NULL),
(164, 'Rendimentos', 1, 12, 37, '4aa97f', NULL),
(165, 'Presentes', 1, 13, 26, '4aa97f', NULL),
(166, 'Vales', 1, 14, 31, '4aa97f', NULL),
(167, '*Ajuste*', 1, 3, 37, '4aa97f', NULL),
(168, 'Outras receitas ', 1, 19, 37, '6d8b97', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cor`
--

CREATE TABLE `cor` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `codigo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cor`
--

INSERT INTO `cor` (`id`, `nome`, `codigo`) VALUES
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
-- Estrutura para tabela `despesa`
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
-- Despejando dados para a tabela `despesa`
--

INSERT INTO `despesa` (`id`, `descricao`, `valor`, `status`, `casal`, `usuario`, `dia`, `mes`, `ano`, `categoria`, `tipo`, `compra`, `banco`) VALUES
(25, 'Aluguel', 650, 0, '6d8b97', 158, 21, 2, 2024, 111, 1, NULL, 44),
(26, 'Camisa', 98.63, 0, '6d8b97', 158, 21, 2, 2024, 116, 0, NULL, 44),
(27, 'Gel', 15, 0, '6d8b97', 158, 21, 2, 2024, 117, 0, NULL, 44),
(28, 'Tênis', 150, 0, '6d8b97', 158, 21, 2, 2024, 116, 0, NULL, 44),
(30, 'Água ', 100, 0, '6d8b97', 158, 21, 2, 2024, 117, 1, NULL, 44),
(31, 'Internet ', 99.9, 0, '6d8b97', 158, 21, 2, 2024, 117, 1, NULL, 44),
(32, 'Saida', 96, 0, '6d8b97', 158, 21, 2, 2024, 117, 1, NULL, 44),
(41, 'Aluguel', 500, 0, '6d8b97', 158, 5, 3, 2024, 111, 1, NULL, 36),
(42, 'Sorvete', 7, 0, '6d8b97', 158, 5, 3, 2024, 148, 0, NULL, 36),
(58, 'teste do sábado ', 500, 0, '6d8b97', 158, 12, 3, 2024, 113, 0, NULL, 39),
(59, 'Teste', 40.93, 0, '6d8b97', 158, 17, 3, 2024, 113, 0, NULL, 39),
(60, 'Ajuste de Saldo', 50, 1, '6d8b97', 158, 26, 3, 2024, 141, 0, NULL, 36),
(61, 'Ajuste de Saldo', 50, 1, '6d8b97', 158, 27, 3, 2024, 141, 0, NULL, 44),
(62, 'Remédio', 0, 0, '6d8b97', 158, 16, 4, 2024, 113, 0, NULL, 36),
(63, 'Aluguel', 500, 0, '6d8b97', 158, 17, 4, 2024, 111, 1, NULL, 39),
(64, 'Ajuste de Saldo', 4000, 1, '6d8b97', 158, 17, 4, 2024, 141, 1, NULL, 37),
(65, 'Ajuste de Saldo', 1799390, 1, '6d8b97', 158, 17, 4, 2024, 141, 1, NULL, 37),
(66, 'Ajuste de Saldo', 796, 1, '6d8b97', 158, 17, 4, 2024, 141, 0, NULL, 36),
(67, 'Ajuste de Saldo', 350.48, 1, '6d8b97', 158, 17, 4, 2024, 141, 0, NULL, 36),
(68, 'Ajuste de Saldo', 35.74, 1, '6d8b97', 158, 17, 4, 2024, 141, 0, NULL, 36),
(69, 'Ajuste de Saldo', 3996.04, 1, '6d8b97', 158, 17, 4, 2024, 141, 0, NULL, 44),
(70, 'Ajuste de Saldo', 4998.33, 1, '6d8b97', 158, 17, 4, 2024, 141, 0, NULL, 44),
(71, 'Ajuste de Saldo', 7175.11, 1, '6d8b97', 158, 17, 4, 2024, 141, 0, NULL, 51),
(73, 'Ajuste de Saldo', 7476.86, 1, '6d8b97', 158, 17, 4, 2024, 141, 1, NULL, 37),
(74, 'Ajuste de Saldo', 4523.14, 1, '6d8b97', 158, 18, 4, 2024, 141, 1, NULL, 37),
(75, 'Ajuste de Saldo', 4.00998, 1, '6d8b97', 158, 20, 4, 2024, 141, 0, NULL, 36);

-- --------------------------------------------------------

--
-- Estrutura para tabela `icones`
--

CREATE TABLE `icones` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `ion_nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `icones`
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
-- Estrutura para tabela `log`
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
-- Estrutura para tabela `objetivo`
--

CREATE TABLE `objetivo` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `valor_final` float NOT NULL,
  `valor_inicial` double NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0: Pendente\r\n1: Concluido',
  `prazo` date NOT NULL,
  `casal` varchar(255) NOT NULL,
  `cor` int(10) NOT NULL,
  `icone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `objetivo`
--

INSERT INTO `objetivo` (`id`, `descricao`, `valor_final`, `valor_inicial`, `status`, `prazo`, `casal`, `cor`, `icone`) VALUES
(4, 'Casar', 30000, 7000, 0, '2024-11-30', '6d8b97', 2, 11),
(6, 'Comprar Casa', 150000, 50000, 0, '2025-08-01', '6d8b97', 5, 27),
(8, 'Comprar notebook', 4000, 2600, 1, '2024-05-27', '6d8b97', 6, 20),
(16, 'Teste pra amanhã ', 50, 2, 0, '2024-05-24', '6d8b97', 21, 35),
(17, 'Objetivo qualquer ', 500, 8, 1, '0000-00-00', '6d8b97', 9, 30);

-- --------------------------------------------------------

--
-- Estrutura para tabela `receita`
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
-- Despejando dados para a tabela `receita`
--

INSERT INTO `receita` (`id`, `descricao`, `valor`, `categoria`, `usuario`, `casal`, `status`, `tipo`, `dia`, `mes`, `ano`, `banco`) VALUES
(90, 'Mais testes', 500, 119, 159, '6d8b97', 0, 0, 5, 3, 2024, 38),
(92, 'Salário', 2000, 119, 158, '6d8b97', 0, 0, 5, 3, 2024, 36),
(94, 'Dinheiro ', 1200, 123, 158, '6d8b97', 0, 0, 5, 3, 2024, 44),
(104, 'Ajuste de Saldo', 200, 142, 159, '6d8b97', 1, 0, 26, 3, 2024, 38),
(106, 'Ajuste de Saldo', 8087, 142, 158, '6d8b97', 1, 0, 14, 4, 2024, 36),
(107, 'Salario', 5000, 119, 158, '6d8b97', 0, 0, 14, 4, 2024, 44),
(108, 'Ajuste de Saldo', 50, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 37),
(109, 'Ajuste de Saldo', 140.93, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 39),
(110, 'Ajuste de Saldo', 39800, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 37),
(111, 'Ajuste de Saldo', 1838390, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 37),
(112, 'Ajuste de Saldo', 5, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 36),
(114, 'Ajuste de Saldo', 351, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 36),
(115, 'Ajuste de Saldo', 45, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 36),
(116, 'Ajuste de Saldo', 41.21, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 36),
(117, 'Ajuste de Saldo', 3983.67, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 44),
(118, 'Ajuste de Saldo', 1011.69, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 44),
(119, 'Ajuste de Saldo', 2540.87, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 44),
(120, 'Ajuste de Saldo', 0.00999832, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 36),
(121, 'Ajuste de Saldo', 0.89, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 52),
(122, 'Ajuste de Saldo', 15029.1, 142, 158, '6d8b97', 1, 0, 17, 4, 2024, 52),
(123, 'Salário ', 2500, 119, 158, '6d8b97', 0, 0, 18, 4, 2024, 51),
(125, '', 1258.7, 122, 158, '6d8b97', 0, 0, 0, 0, 0, 51);

-- --------------------------------------------------------

--
-- Estrutura para tabela `senha_temp`
--

CREATE TABLE `senha_temp` (
  `id` int(11) NOT NULL,
  `id_usuario` int(100) NOT NULL,
  `token` varchar(10) NOT NULL,
  `validade` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `senha_temp`
--

INSERT INTO `senha_temp` (`id`, `id_usuario`, `token`, `validade`) VALUES
(29, 158, '62e6', '2024-05-20 22:43:27');

-- --------------------------------------------------------

--
-- Estrutura para tabela `transferencias`
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
-- Despejando dados para a tabela `transferencias`
--

INSERT INTO `transferencias` (`id`, `descricao`, `valor`, `casal`, `usuario`, `dia`, `mes`, `ano`, `tipo`, `banco_origem`, `banco_destino`, `relacao`) VALUES
(78, 'Transferência saída', 1500, '6d8b97', 158, 4, 2, 2024, 0, 37, 36, 79),
(79, 'Transferência entrada', 1500, '6d8b97', 158, 4, 2, 2024, 1, 36, 37, 78),
(82, 'Transferência saída', 2000, '6d8b97', 158, 11, 3, 2024, 0, 36, 44, 83),
(83, 'Transferência entrada', 2000, '6d8b97', 158, 11, 3, 2024, 1, 44, 36, 82),
(84, 'Transferência saída', 1500, '6d8b97', 158, 16, 3, 2024, 0, 44, 37, 85),
(85, 'Transferência entrada', 1500, '6d8b97', 158, 16, 3, 2024, 1, 37, 44, 84),
(86, 'Transferência saída', 400, '6d8b97', 158, 16, 3, 2024, 0, 44, 39, 87),
(87, 'Transferência entrada', 400, '6d8b97', 158, 16, 3, 2024, 1, 39, 44, 86),
(88, 'Transferência saída', 50, '6d8b97', 158, 26, 3, 2024, 0, 36, 44, 89),
(89, 'Transferência entrada', 50, '6d8b97', 158, 26, 3, 2024, 1, 44, 36, 88),
(90, 'Transferência saída', 5000, '6d8b97', 158, 14, 4, 2024, 0, 44, 36, 91),
(91, 'Transferência entrada', 5000, '6d8b97', 158, 14, 4, 2024, 1, 36, 44, 90),
(92, 'Transferência saída', 6000, '6d8b97', 158, 14, 4, 2024, 0, 36, 39, 93),
(93, 'Transferência entrada', 6000, '6d8b97', 158, 14, 4, 2024, 1, 39, 36, 92),
(94, 'Transferência saída', 1000, '6d8b97', 158, 14, 4, 2024, 0, 44, 36, 95),
(95, 'Transferência entrada', 1000, '6d8b97', 158, 14, 4, 2024, 1, 36, 44, 94),
(96, 'Transferência saída', 50, '6d8b97', 158, 20, 4, 2024, 0, 36, 44, 97),
(97, 'Transferência entrada', 50, '6d8b97', 158, 20, 4, 2024, 1, 44, 36, 96),
(98, 'Transferência saída', 50, '6d8b97', 158, 20, 4, 2024, 0, 44, 36, 99),
(99, 'Transferência entrada', 50, '6d8b97', 158, 20, 4, 2024, 1, 36, 44, 98),
(100, 'Transferência saída', 50, '6d8b97', 158, 20, 4, 2024, 0, 36, 44, 101),
(101, 'Transferência entrada', 50, '6d8b97', 158, 20, 4, 2024, 1, 44, 36, 100),
(102, 'Transferência saída', 50, '6d8b97', 158, 20, 4, 2024, 0, 44, 36, 103),
(103, 'Transferência entrada', 50, '6d8b97', 158, 20, 4, 2024, 1, 36, 44, 102),
(104, 'Transferência saída', 50, '6d8b97', 158, 20, 4, 2024, 0, 36, 44, 105),
(105, 'Transferência entrada', 50, '6d8b97', 158, 20, 4, 2024, 1, 44, 36, 104),
(106, 'Transferência saída', 50, '6d8b97', 158, 21, 4, 2024, 0, 44, 36, 107),
(107, 'Transferência entrada', 50, '6d8b97', 158, 21, 4, 2024, 1, 36, 44, 106),
(108, 'Transferência saída', 50, '6d8b97', 158, 21, 4, 2024, 0, 36, 44, 109),
(109, 'Transferência entrada', 50, '6d8b97', 158, 21, 4, 2024, 1, 44, 36, 108),
(110, 'Transferência saída', 10, '6d8b97', 158, 21, 4, 2024, 0, 44, 36, 111),
(111, 'Transferência entrada', 10, '6d8b97', 158, 21, 4, 2024, 1, 36, 44, 110);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
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
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `casal`, `email_parceiro`, `dt_criacao`, `ultimo_acesso`) VALUES
(158, 'Admin', 'tester@teste.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '6d8b97', 'parceiro@qualquer.com', '2024-03-21 19:43:33', '2024-05-24 02:09:06'),
(159, 'Parceiro', 'parceiro@qualquer.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '6d8b97', '', '2024-03-21 19:48:08', '2024-05-21 00:52:21'),
(180, 'Gideone Lacerda Costa', 'gideonilacerda@gmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '4aa97f', 'thamilyfelizardo532@gmail.com', '2024-05-20 23:08:30', '0000-00-00 00:00:00');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `aporte_objetivo`
--
ALTER TABLE `aporte_objetivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_aporte_objetivo` (`objetivo`),
  ADD KEY `fk_aporte_casal` (`casal`);

--
-- Índices de tabela `banco`
--
ALTER TABLE `banco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_banco_casal` (`casal`),
  ADD KEY `fk_banco_usuario` (`usuario`);

--
-- Índices de tabela `casal`
--
ALTER TABLE `casal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod_casal` (`cod_casal`),
  ADD UNIQUE KEY `usuario_princ` (`usuario_princ`),
  ADD UNIQUE KEY `usuario_sec` (`usuario_sec`),
  ADD KEY `fk_usuario_princ_casal` (`usuario_princ`),
  ADD KEY `fk_usuario_sec_casal` (`usuario_sec`);

--
-- Índices de tabela `categoria_tr`
--
ALTER TABLE `categoria_tr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categoria_tr_cor` (`cor`),
  ADD KEY `fk_categoria_tr_casal` (`casal`),
  ADD KEY `fk_categoria_tr_icone` (`icone`);

--
-- Índices de tabela `cor`
--
ALTER TABLE `cor`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `despesa`
--
ALTER TABLE `despesa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_despesa_col_casal` (`casal`),
  ADD KEY `fk_despesa_col_categoria` (`categoria`),
  ADD KEY `fk_despesa_col_banco` (`banco`),
  ADD KEY `fk_despesa_usuario` (`usuario`);

--
-- Índices de tabela `icones`
--
ALTER TABLE `icones`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_log` (`usuario`);

--
-- Índices de tabela `objetivo`
--
ALTER TABLE `objetivo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_objetivo_casal` (`casal`),
  ADD KEY `fk_objetivo_icone` (`icone`),
  ADD KEY `fk_objetivo_cor` (`cor`);

--
-- Índices de tabela `receita`
--
ALTER TABLE `receita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_receita_usuario` (`usuario`),
  ADD KEY `fk_receita_categoria` (`categoria`),
  ADD KEY `fk_receita_banco` (`banco`);

--
-- Índices de tabela `senha_temp`
--
ALTER TABLE `senha_temp`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `transferencias`
--
ALTER TABLE `transferencias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `relacao` (`relacao`),
  ADD KEY `fk_transf_casal` (`casal`),
  ADD KEY `fk_tranf_usuario` (`usuario`),
  ADD KEY `fk_transf_banco_origem` (`banco_origem`),
  ADD KEY `fk_transf_banco_destino` (`banco_destino`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email_usuario` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aporte_objetivo`
--
ALTER TABLE `aporte_objetivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `banco`
--
ALTER TABLE `banco`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de tabela `casal`
--
ALTER TABLE `casal`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de tabela `categoria_tr`
--
ALTER TABLE `categoria_tr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT de tabela `cor`
--
ALTER TABLE `cor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `despesa`
--
ALTER TABLE `despesa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `receita`
--
ALTER TABLE `receita`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT de tabela `senha_temp`
--
ALTER TABLE `senha_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `transferencias`
--
ALTER TABLE `transferencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `aporte_objetivo`
--
ALTER TABLE `aporte_objetivo`
  ADD CONSTRAINT `fk_aporte_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`);

--
-- Restrições para tabelas `banco`
--
ALTER TABLE `banco`
  ADD CONSTRAINT `fk_banco_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_banco_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `casal`
--
ALTER TABLE `casal`
  ADD CONSTRAINT `fk_usuario_princ_casal` FOREIGN KEY (`usuario_princ`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_sec_casal` FOREIGN KEY (`usuario_sec`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `categoria_tr`
--
ALTER TABLE `categoria_tr`
  ADD CONSTRAINT `fk_categoria_tr_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_categoria_tr_cor` FOREIGN KEY (`cor`) REFERENCES `cor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_categoria_tr_icone` FOREIGN KEY (`icone`) REFERENCES `icones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `despesa`
--
ALTER TABLE `despesa`
  ADD CONSTRAINT `fk_despesa_banco` FOREIGN KEY (`banco`) REFERENCES `banco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_despesa_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_despesa_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria_tr` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_despesa_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `objetivo`
--
ALTER TABLE `objetivo`
  ADD CONSTRAINT `fk_objetivo_casal` FOREIGN KEY (`casal`) REFERENCES `casal` (`cod_casal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_objetivo_cor` FOREIGN KEY (`cor`) REFERENCES `cor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_objetivo_icone` FOREIGN KEY (`icone`) REFERENCES `icones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `receita`
--
ALTER TABLE `receita`
  ADD CONSTRAINT `fk_receita_banco` FOREIGN KEY (`banco`) REFERENCES `banco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_receita_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria_tr` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_receita_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `transferencias`
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
