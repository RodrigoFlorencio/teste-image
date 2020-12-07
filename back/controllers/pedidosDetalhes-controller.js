const mysql = require('../mysql')


// Retorna todos os pedidos
exports.getPedidos = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            `SELECT    pedidos_detalhes.id,
                                pedidos_detalhes.id_pedido,
                                pedidos_detalhes.id_produto,
                                pedidos_detalhes.quantidade,
                                pedidos_detalhes.id_preco,
                                pedidos_detalhes.sub_total,
                                pedidos_detalhes.imagem_produto,
                                produtos.imagem,
                                produtos.preco
                        FROM    pedidos_detalhes
                  INNER JOIN    pedidos
                          ON    pedidos.id_pedido = pedidos_detalhes.id_pedido
                  INNER JOIN    produtos
                          ON    produtos.id = pedidos_detalhes.imagem_produto
                  INNER JOIN    usuarios
                          ON    usuarios.id_usuario = pedidos.id_user;`)
        const response = {
            totalPedidos: result.length,
            detalhesPedidos: result.map(ped => {
                return {
                    id: ped.id,
                    id_pedido: ped.id_pedido,
                    id_produto: ped.id_produto,
                    quantidade: ped.quantidade,
                    preco: ped.preco,
                    sub_total: ped.sub_total,
                    detalhesImg: result.map(img => {
                        return {
                            imagem: [
                                img.imagem
                            ]
                        }
                    }),
                    request: {
                        tipo: 'GET',
                        descrição: 'Retorna os detalhes de um pedido específico',
                        url: 'http://localhost:3002/pedidos-detalhes/' + ped.id
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Posta um pedido
exports.postPedidos = async (req, res, next) => {
    try {
        const query = `INSERT INTO pedidos_detalhes
            (
                id_pedido,
                id_produto,
                preco,
                quantidade,
                sub_total,
                imagem_produto
            ) VALUES (?,?,?,?,?,?)`
        const result = await mysql.execute(query,
            [
                req.body.id_pedido,
                req.body.id_produto,
                req.body.preco,
                req.body.quantidade,
                req.body.sub_total,
                req.body.imagem_produto,
            ])
        const response = {
            mensagem: 'Pedido inserido com sucesso!',
            pedidoCriado: {
                id: result.insertId,
                id_pedido: req.body.id_pedido,
                id_produto: req.body.id_produto,
                preco: req.body.preco,
                quantidade: req.body.quantidade,
                sub_total: req.body.sub_total,
                imagem_produto: req.body.imagem_produto,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna todos os pedidos detalhado',
                    url: 'http://localhost:3002/pedidos_detalhes'
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Retorna um pedido pelo ID
exports.getUmPedido = async (req, res, next) => {
    try {
        const query =
            `SELECT             pedidos_detalhes.id,
                                pedidos_detalhes.id_pedido,
                                pedidos_detalhes.id_produto,
                                pedidos_detalhes.quantidade,
                                pedidos_detalhes.id_preco,
                                pedidos_detalhes.sub_total,
                                pedidos_detalhes.imagem_produto,
                                produtos.imagem,
                                produtos.preco
                        FROM    pedidos_detalhes
                  INNER JOIN    pedidos
                          ON    pedidos.id_pedido = pedidos_detalhes.id_pedido
                  INNER JOIN    produtos
                          ON    produtos.id = pedidos_detalhes.imagem_produto
                  INNER JOIN    usuarios
                          ON    usuarios.id_usuario = pedidos.id_user
                       WHERE    pedidos.id_pedido = ?;`
        const result = await mysql.execute(query, [req.params.id])

        if (result.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado produto com este ID'
            })
        }
        const response = {
            detalhesPedidos: result.map(ped => {
                return {
                    id: ped.id,
                    id_pedido: ped.id_pedido,
                    id_produto: ped.id_produto,
                    quantidade: ped.quantidade,
                    preco: ped.preco,
                    sub_total: ped.sub_total,
                    detalhesImg: result.map(img => {
                        return {
                            imagem: [
                                img.imagem
                            ]
                        }
                    }),
                    request: {
                        tipo: 'GET',
                        descrição: 'Retorna um pedido',
                        url: 'http://localhost:3002/pedidos-detalhes'
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Remove um pedido
exports.deletePedidos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM pedidos_detalhes WHERE id = ?`, [req.body.id],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Pedido removido com sucesso!',
                    request: {
                        tipo: 'POST',
                        descrição: 'Insere um pedido',
                        url: 'http://localhost:3002/pedidos-detalhes',
                    }
                }
                return res.status(200).send({ response })
            }
        )
    })
}
