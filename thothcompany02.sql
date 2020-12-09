-- phpMyAdmin SQL Dump
-- version 4.3.7
-- http://www.phpmyadmin.net
--
-- Host: mysql14-farm10.kinghost.net
-- Tempo de geração: 09/12/2020 às 10:33
-- Versão do servidor: 5.6.49-log
-- Versão do PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de dados: `thothcompany02`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `senha` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrinho`
--

CREATE TABLE IF NOT EXISTS `carrinho` (
  `id_cart` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `carrinho`
--

INSERT INTO `carrinho` (`id_cart`, `id_usuario`, `id_produto`, `quantidade`) VALUES
(1, 3, 4, 25),
(2, 1, 2, 30),
(3, 2, 5, 23);

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL,
  `nome_cat` varchar(20) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome_cat`) VALUES
(1, 'Fruta'),
(2, 'Legume'),
(3, 'Verdura');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fornecedores`
--

CREATE TABLE IF NOT EXISTS `fornecedores` (
  `id_fornecedor` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `fantasia` varchar(255) NOT NULL,
  `cpfCnpj` varchar(14) NOT NULL,
  `inscEst` varchar(14) NOT NULL,
  `rg` varchar(14) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `logradouro` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(60) DEFAULT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `uf` char(2) NOT NULL,
  `codEstado` int(11) DEFAULT NULL,
  `codMunicipio` int(11) DEFAULT NULL,
  `fone1` varchar(15) NOT NULL,
  `fone2` varchar(15) DEFAULT NULL,
  `fone3` varchar(15) DEFAULT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `fornecedores`
--

INSERT INTO `fornecedores` (`id_fornecedor`, `nome`, `fantasia`, `cpfCnpj`, `inscEst`, `rg`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `uf`, `codEstado`, `codMunicipio`, `fone1`, `fone2`, `fone3`, `email`) VALUES
(1, 'Com De Hortifruiti 10 Estrela LTDA EPP', '10 Estrela', '00000000000', '147277950112', '', '05316900', 'Av. Dr. Gastão Vidigal', '1946', NULL, 'Vila Leopoldina', 'São Paulo', 'São Paulo', 'SP', NULL, NULL, '1136438850', NULL, NULL, 'estrela10@mail.com'),
(2, 'Frutamina', 'Frutamina', '06103610000105', '147277950112', '', '05316900', 'Av. Dr. Gastão Vidigal', '1496', NULL, 'Vila Leopoldina', 'São Paulo', 'São Paulo', 'SP', NULL, NULL, '1136438850', NULL, NULL, 'frutamina@mail.com'),
(8, 'Zé da Granja', 'Granja do Zé', '12457854512255', '147277950112', '4651321', '08410210', 'Rua Iguatama', '415', '', 'Guaianases', 'São Paulo', '', 'SP', 1, 1, '1136438850', NULL, NULL, 'evan@mail.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagens`
--

CREATE TABLE IF NOT EXISTS `imagens` (
  `id` int(11) NOT NULL,
  `imagem` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `imagens`
--

INSERT INTO `imagens` (`id`, `imagem`) VALUES
(16, ''),
(17, 'sdadasd'),
(18, 'sdadasd'),
(19, 'sdadasd'),
(20, '489498');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagens_produtos`
--

CREATE TABLE IF NOT EXISTS `imagens_produtos` (
  `id_imagem` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `caminho` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `imagens_produtos`
--

INSERT INTO `imagens_produtos` (`id_imagem`, `id_produto`, `caminho`) VALUES
(1, 1, 'uploads\\2020-09-10T12-52-51.558Zameixa_importado.jpg'),
(4, 0, 'uploads\\2020-09-21T13-04-31.054Zpromo.png'),
(3, 0, 'uploads\\2020-09-21T13-31-47.840Zfundo_transparente.png'),
(2, 0, 'uploads\\2020-09-21T18-58-41.977Zdesc10.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamento`
--

CREATE TABLE IF NOT EXISTS `pagamento` (
  `id` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `pagamento`
--

INSERT INTO `pagamento` (`id`, `tipo`) VALUES
(1, 'Boleto Bancário'),
(2, 'Cartão de Crédito');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE IF NOT EXISTS `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `data` date NOT NULL,
  `frete` float(10,2) NOT NULL,
  `desconto` float(10,2) NOT NULL,
  `valor_total` float(10,2) NOT NULL,
  `pagamento_tipo` tinyint(1) NOT NULL,
  `parcelamento` varchar(10) NOT NULL,
  `entrega_tipo` varchar(10) NOT NULL,
  `entrega_prazo` varchar(50) NOT NULL,
  `status_entrega` tinyint(1) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `uf` char(2) NOT NULL,
  `telefone` varchar(14) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_user`, `data`, `frete`, `desconto`, `valor_total`, `pagamento_tipo`, `parcelamento`, `entrega_tipo`, `entrega_prazo`, `status_entrega`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `uf`, `telefone`) VALUES
(3, 4, '2020-10-21', 15.65, 0.00, 1253.78, 2, '5', 'Normal', '2 dias úteis', 4, '05316-900', 'Av. Dr. Gastão Vidigal', '1946', 'Sala 15', 'Vila Leopoldina', 'São Paulo', 'SP', '(00)00000-0000'),
(4, 4, '2020-10-14', 15.65, 44.34, 500.78, 2, '2', 'Normal', '2 dias úteis', 2, '05316-900', 'Av. Dr. Gastão Vidigal', '1946', 'Sala 15', 'Vila Leopoldina', 'São Paulo', 'SP', '(00)00000-0000'),
(5, 2, '2020-10-20', 11.45, 0.00, 1010.54, 2, '1', 'Normal', '3 dias úteis', 1, '08507-010', 'Rua Ayame Yoshikawa', '152', NULL, 'Vila São Paulo', 'Ferraz de Vasconcelos', 'SP', '(11)00000-0000'),
(6, 8, '2020-09-17', 0.00, 0.00, 752.89, 2, '3', 'Expressa', '2 dias úteis', 2, '08473-090', 'Rua Conjunto Sítio Conceição', '3', NULL, 'Conjunto Habitacional Sitio Conceição', 'São Paulo', 'SP', '(11)00000-0000');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos_detalhes`
--

CREATE TABLE IF NOT EXISTS `pedidos_detalhes` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `id_preco` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `sub_total` float(10,2) NOT NULL,
  `imagem_produto` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `pedidos_detalhes`
--

INSERT INTO `pedidos_detalhes` (`id`, `id_pedido`, `id_produto`, `id_preco`, `quantidade`, `sub_total`, `imagem_produto`) VALUES
(1, 3, 5, 5, 62, 801.45, 5),
(2, 3, 3, 3, 12, 1612.78, 3),
(5, 6, 2, 2, 15, 502.16, 2),
(3, 4, 5, 5, 37, 886.90, 5),
(4, 5, 1, 1, 57, 1654.15, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` float(10,2) NOT NULL,
  `categoria` int(11) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `descricao` text NOT NULL,
  `desconto` tinyint(1) DEFAULT NULL,
  `promo` tinyint(1) DEFAULT NULL,
  `quantidade` int(11) NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  `imagem` varchar(100) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `preco`, `categoria`, `tipo`, `descricao`, `desconto`, `promo`, `quantidade`, `id_fornecedor`, `imagem`) VALUES
(2, 'Avocado', 2.47, 1, 'duzia', 'O avocado tem de fato mais nutrientes e 10% menos calorias do que o abacate comum. Essa pequena fruta em forma de pêra possui alto teor de fibras, o dobro do potássio da banana, vitaminas B6, vitamina E, ácidos graxos monoinsaturados, antioxidantes e gordura saudável. Resumindo, é uma bomba nutritiva!', NULL, NULL, 356, 1, 'uploads\\2020-09-10T13-45-54.785Zavocado.jpg'),
(3, 'Alface Mimosa', 0.98, 3, 'unidade', 'Em 100 gramas de alface, você consegue muitas vitaminas. Por exemplo, há 21% da dose diária recomendada (RDA) de vitamina A em alface, 18% de ácido fólico e 5% de vitamina C.', NULL, 2, 258, 2, 'uploads\\2020-09-10T13-46-58.926Zalface_mimosa.jpg'),
(4, 'Alcachofra', 1.41, 2, 'quilo', 'A Alcachofra além de rica em nutrientes possui baixo teor de gorduras saturadas e colesterol, com boa quantidade de fibras torna-se uma ótima aliada na perda de peso pois proporciona a sensação de saciedade além é claro das propriedades diuréticas da planta que auxiliam na eliminação da urina e combatendo o inchaço. ', NULL, NULL, 253, 1, 'uploads\\2020-09-11T18-41-43.076Zalcachofra.jpg'),
(5, 'Morango', 25.34, 1, 'caixa', 'O valor nutricional do morango é bastante elevado, pois a fruta é rica em nutrientes importantes para o organismo e tem uma quantidade baixa de calorias.', NULL, NULL, 120, 2, 'uploads\\2020-09-16T15-21-41.636Zmorango.jpg'),
(6, 'Ameixa Importada', 5.78, 1, 'duzia', 'Descrição da ameixa', 0, 1, 300, 8, 'uploads\\2020-11-10T17-06-05.134Zameixa_importado.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `promo`
--

CREATE TABLE IF NOT EXISTS `promo` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `caminho` varchar(255) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `promo`
--

INSERT INTO `promo` (`id`, `nome`, `caminho`) VALUES
(1, 'Foto Promoção', 'uploads\\2020-09-21T13-04-31.054Zpromo.png'),
(2, 'Desconto 10%', 'uploads\\2020-09-21T18-58-41.977Zdesc10.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `status_entrega`
--

CREATE TABLE IF NOT EXISTS `status_entrega` (
  `id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `status_entrega`
--

INSERT INTO `status_entrega` (`id`, `status`) VALUES
(1, 'pedido realizado'),
(2, 'pagamento confirmado'),
(3, 'saiu para entrega'),
(4, 'entregue');

-- --------------------------------------------------------

--
-- Estrutura para tabela `teste`
--

CREATE TABLE IF NOT EXISTS `teste` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` float(10,2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Fazendo dump de dados para tabela `teste`
--

INSERT INTO `teste` (`id`, `nome`, `preco`) VALUES
(1, 'Pêra', 777.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `sobrenome` varchar(150) NOT NULL,
  `nascimento` date NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `email` varchar(150) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `logradouro` varchar(50) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `complemento` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` char(2) NOT NULL,
  `tel` varchar(14) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nome`, `sobrenome`, `nascimento`, `cpf`, `email`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `uf`, `tel`, `senha`) VALUES
(3, 'Roberto Henrique', 'Moraes', '1986-11-18', '23145678978', 'roberto@mail.com', '08410210', 'Rua Iguatama', '415', 'Estação', 'Guaianases', 'São Paulo', 'SP', '11956235689', '$2b$10$yd3TVnZayEUgJ3LOyj5LtOh6zAxUK4WIVq42ElPhkfQRxyfTX45Xe'),
(2, 'Mario', 'Quintana', '1986-11-18', '000.000.000-00', 'mario@mail.com', '08473-090', 'Rua Conjunto Sítio Conceição', '3', 'apto 44 bloco 7', 'Conjunto Habitacional Sitio Conceição', 'São Paulo', 'SP', '11987628608', '$2b$10$7XZKlVBdC9V7OIXmmGEvuuiFh7Vo4SK7wVwGwSvCExP4Kl3ZsBdRm'),
(1, 'Olavo', 'Mendes', '2020-09-06', '000.000.000-00', 'olavo@mail.com', '08410-210', 'Rua Iguatama', '415', '', 'Vila Princesa Isabel', 'São Paulo', 'SP', '(11)956237845', '$2b$10$IhsORoLgEzgB26D1VYjA0OiWLfNAMxTRWMbnHH6ALiNBiqsZYyKFi'),
(4, 'Rodrigo', 'Florencio', '1986-11-18', '23145678978', 'rodrigo@mail.com', '08410210', 'Rua Iguatama', '415', 'Estação', 'Guaianases', 'São Paulo', 'SP', '11956235689', '$2b$10$NER0At0rZ/T8hJK/yD/XL.1.KGP5i0c1.wOTEoNA2kgWFfD9X0f4C'),
(5, 'Sergio', 'Moraes', '1986-11-18', '23145678978', 'moraes@mail.com', '08410210', 'Rua Iguatama', '415', 'Estação', 'Guaianases', 'São Paulo', 'SP', '11956235689', '$2b$10$kcwIx3Lhd6CdkSo.4MyKeuuTGDz4YcnicCqwOl4lHAAepZlgxR5g6'),
(6, 'Mauricio', 'Sanders', '2020-10-03', '56345896547', 'sanders@mail.com', '08507010', '', '', '', 'Vila São Paulo', 'Ferraz de Vasconcelos', 'SP', '11912457856', '$2b$10$FonW0fdFFDgE6eBPCDWaiOyMtvpWaWP/o6BO3hDnkUqy8hRgDEPHi'),
(7, 'Sandro', 'Pires', '2020-10-08', '58742145878', 'pires@mail.com', '08473090', '', '3', 'apto 44 bloco 7', 'Conjunto Habitacional Sitio Conceição', 'São Paulo', 'SP', '00000000000', '$2b$10$o5Y4LYb.UhSyJNpYYNdJEOS7GT5lWtsBKoPZSpn72tkqw15hQ6e6W'),
(8, 'Marcio', 'Queiroz', '2020-10-07', '78945612378', 'queiroz@mail.com', '08410210', '', '415', '', 'Vila Princesa Isabel', 'São Paulo', 'SP', '11987455689', '$2b$10$C4eNX150dnvLFA5wuN5bS.0174/W8hsbR9kMyF39uRWReuS8Yq/Ei'),
(9, 'Marcos', 'Silva', '1986-11-18', '23145678978', 'silva@mail.com', '08410-210', 'Rua Iguatama', '415', '', 'Guaianases', 'São Paulo', 'SP', '11956235689', '$2b$10$8DjORCcoF50SHyF.Bu9wo.06bTYtH0MraOcqC9ZLEDxRuOCcVn8HO'),
(26, 'Rubinei', 'Santos', '0000-00-00', '06612305570', 'rubinei@outlook.com.br', '48895555', 'dasddsa', '484484', 'casa', 'centro', 'Morro do Chapeu', 'UL', '48898498849', '$2b$10$xyhna3bRS0yhSHgoPjwRlu2/1s3Vuo1.Q9BmlP.49z6WN4Y/N556q');

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas`
--

CREATE TABLE IF NOT EXISTS `vendas` (
  `id_venda` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `valor_total` float(14,2) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `carrinho`
--
ALTER TABLE `carrinho`
  ADD PRIMARY KEY (`id_cart`), ADD KEY `fk_user` (`id_usuario`), ADD KEY `fk_pro` (`id_produto`);

--
-- Índices de tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  ADD PRIMARY KEY (`id_fornecedor`);

--
-- Índices de tabela `imagens`
--
ALTER TABLE `imagens`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `imagens_produtos`
--
ALTER TABLE `imagens_produtos`
  ADD PRIMARY KEY (`id_imagem`), ADD KEY `fk_imagens` (`id_produto`);

--
-- Índices de tabela `pagamento`
--
ALTER TABLE `pagamento`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`), ADD KEY `fk_nome` (`id_user`), ADD KEY `fk_statusEntrega` (`status_entrega`), ADD KEY `fk_tipoPagamento` (`pagamento_tipo`);

--
-- Índices de tabela `pedidos_detalhes`
--
ALTER TABLE `pedidos_detalhes`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_pedido` (`id_pedido`), ADD KEY `fk_prod` (`id_produto`), ADD KEY `fk_img` (`imagem_produto`), ADD KEY `fk_preco` (`id_preco`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_produtos` (`categoria`), ADD KEY `fk_prod` (`id_fornecedor`), ADD KEY `fk_promo` (`promo`);

--
-- Índices de tabela `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `status_entrega`
--
ALTER TABLE `status_entrega`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `teste`
--
ALTER TABLE `teste`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`), ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id_venda`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `carrinho`
--
ALTER TABLE `carrinho`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  MODIFY `id_fornecedor` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de tabela `imagens`
--
ALTER TABLE `imagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de tabela `imagens_produtos`
--
ALTER TABLE `imagens_produtos`
  MODIFY `id_imagem` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de tabela `pagamento`
--
ALTER TABLE `pagamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de tabela `pedidos_detalhes`
--
ALTER TABLE `pedidos_detalhes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT de tabela `promo`
--
ALTER TABLE `promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de tabela `status_entrega`
--
ALTER TABLE `status_entrega`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de tabela `teste`
--
ALTER TABLE `teste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id_venda` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
