const mysql = require('../mysql')

// Retorna todos os produtos
exports.getProdutos = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            `SELECT     produtos.id,
                        produtos.nome,
                        produtos.preco,
                        produtos.categoria,
                        produtos.tipo,
                        produtos.descricao,
                        produtos.desconto,
                        produtos.promo,
                        produtos.quantidade,
                        produtos.imagem,
                        fornecedores.fantasia,
                        categorias.nome_cat,
                        IFNULL(promo.caminho, '') AS 'caminho'
                FROM    produtos  
          INNER JOIN    fornecedores 
                  ON    fornecedores.id_fornecedor = produtos.id_fornecedor 
          INNER JOIN    categorias
                  ON    categorias.id = produtos.categoria
           LEFT JOIN    promo
                  ON    promo.id = produtos.promo
            ORDER BY    id;`)
        const response = {
            totalProdutos: result.length,
            produtos: result.map(prod => {
                return {
                    id: prod.id,
                    nome: prod.nome,
                    preco: prod.preco,
                    categoria: prod.nome_cat,
                    tipo: prod.tipo,
                    descricao: prod.descricao,
                    desconto: prod.desconto,
                    promo: prod.caminho,
                    quantidade: prod.quantidade,
                    fornecedor: prod.fantasia,
                    imagem: prod.imagem,
                    request: {
                        tipo: 'GET',
                        descrição: 'Retorna os detalhes de um produto específico',
                        url: 'http://localhost:3002/produtos/' + prod.id
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }

}


// Insere um produto
exports.postProdutos = async (req, res, next) => {
    console.log(req.file)
    try {
        const query = `INSERT INTO produtos 
            (
                nome, 
                preco, 
                categoria, 
                tipo, 
                descricao, 
                desconto, 
                promo, 
                quantidade, 
                id_fornecedor, 
                imagem) VALUES (?,?,?,?,?,?,?,?,?,?)`
        const result = await mysql.execute(query,
            [
                req.body.nome,
                req.body.preco,
                req.body.categoria,
                req.body.tipo,
                req.body.descricao,
                req.body.desconto,
                req.body.promo,
                req.body.quantidade,
                req.body.id_fornecedor
            ])
        const response = {
            mensagem: 'Produto inserido com sucesso!',
            produtoCriado: {
                id: result.insertId,
                nome: req.body.nome,
                preco: req.body.preco,
                categoria: req.body.categoria,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                desconto: req.body.desconto,
                promo: req.body.promo,
                quantidade: req.body.quantidade,
                id_fornecedor: req.body.id_fornecedor,
                imagem: req.body.imagem,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna todos os produtos',
                    url: 'http://localhost:3002/produtos'
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Retorna um produto
exports.getUmProduto = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos WHERE id = ?;'
        const result = await mysql.execute(query, [req.params.id])

        if (result.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado produto com este ID'
            })
        }

        const response = {
            produto: {
                id: result[0].id,
                nome: result[0].nome,
                preco: result[0].preco,
                categoria: result[0].categoria,
                tipo: result[0].tipo,
                descricao: result[0].descricao,
                desconto: result[0].desconto,
                promo: result[0].promo,
                quantidade: result[0].quantidade,
                id_fornecedor: result[0].id_fornecedor,
                imagem: result[0].imagem,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna um produto',
                    url: 'http://localhost:3002/produtos'
                }
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Altera um produto
exports.updateProdutos = async (req, res, next) => {
    try {
        const query =
            `UPDATE     produtos
                             SET    nome            = ?,
                                    preco           = ?,
                                    categoria       = ?,
                                    tipo            = ?,
                                    descricao       = ?,
                                    desconto        = ?,
                                    promo           = ?,
                                    quantidade      = ?,
                                    id_fornecedor   = ?,
                                    imagem          = ?
                           WHERE    id              = ?`
        const result = await mysql.execute(query,
            [
                req.body.nome,
                req.body.preco,
                req.body.categoria,
                req.body.tipo,
                req.body.descricao,
                req.body.desconto,
                req.body.promo,
                req.body.quantidade,
                req.body.id_fornecedor,
                req.body.imagem,
                req.params.id
            ])
        const response = {
            mensagem: 'Produto alterado com sucesso!',
            produtoEditado: {
                id: req.body.id,
                nome: req.body.nome,
                preco: req.body.preco,
                categoria: req.body.categoria,
                tipo: req.body.tipo,
                descrição: req.body.descricao,
                desconto: req.body.desconto,
                promo: req.body.promo,
                quantidade: req.body.quantidade,
                id_fornecedor: req.body.id_fornecedor,
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


//Remove um produto
exports.deleteProdutos = async (req, res, next) => {
    try {
        const query = `DELETE FROM produtos WHERE id = ?`
        await mysql.execute(query, [req.params.id])
        const response = {
            mensagem: 'Produto removido com sucesso!',
            request: {
                tipo: 'POST',
                descrição: 'Insere um produto',
                url: 'http://localhost:3002/produtos/',
                body: {
                    nome: 'String',
                    preco: 'Number'
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Retorna todas as imagens
exports.getImagens = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM imagens_produtos WHERE id = ?;'
        const result = await mysql.execute(query, [req.params.id])
        const response = {
            quantidade: result.length,
            imagens: result.map(img => {
                return {
                    id: parseInt(req.params.id),
                    id_imagem: img.id_imagem,
                    caminho: img.caminho,
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


//Insere uma imagem
exports.postImagens = async (req, res, next) => {
    try {
        const query = 'INSERT INTO imagens_produtos (id, caminho) VALUES (?,?)'
        const result = await mysql.execute(query,
            [
                req.params.id,
                req.file.path
            ])
        const response = {
            mensagem: 'Imagem inserida com sucesso!',
            imagemCriada: {
                id: req.params.id,
                id_imagem: result.insertId,
                imagem: req.file.path,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna todas as imagens',
                    url: 'http://localhost:3002/produtos/' + req.params.id_produto + '/imagens'
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
