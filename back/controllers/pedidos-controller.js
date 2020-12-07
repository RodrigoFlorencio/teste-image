const mysql = require('../mysql')


// Retorna todos os pedidos
exports.getPedidos = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            `SELECT     pedidos.id_pedido,
                        pedidos.id_user,
                        usuarios.nome,
                        usuarios.sobrenome,
                        pedidos.data,
                        pedidos.frete,
                        pedidos.desconto,
                        pedidos.valor_total,
                        pedidos.parcelamento,
                        pedidos.entrega_tipo,
                        pedidos.entrega_prazo,
                        pedidos.status_entrega,
                        pedidos.cep,
                        pedidos.logradouro,
                        pedidos.numero,
                        pedidos.complemento,
                        pedidos.bairro,
                        pedidos.cidade,
                        pedidos.uf,
                        telefone,
                        pagamento.tipo,
                        status_entrega.status,
                        produtos.imagem,
                        pedidos_detalhes.imagem_produto,
                        SUM(pedidos_detalhes.sub_total) as sub_total
                FROM    pedidos
          INNER JOIN    usuarios
                  ON    usuarios.id_usuario = pedidos.id_user
          INNER JOIN    pagamento
                  ON    pagamento.id = pedidos.pagamento_tipo
          INNER JOIN    status_entrega
                  ON    status_entrega.id = pedidos.status_entrega
          INNER JOIN    pedidos_detalhes
                  ON    pedidos_detalhes.id_pedido = pedidos.id_pedido
          INNER JOIN    produtos
                  ON    produtos.id = pedidos.id_pedido
            GROUP BY    pedidos.id_pedido
            ORDER BY    id_pedido;`)

        const response = {
            totalPedidos: result.length,
            pedido: result.map(ped => {
                return {
                    id_pedido: ped.id_pedido,
                    id_user: ped.id_user,
                    nome: ped.nome,
                    sobrenome: ped.sobrenome,
                    data: ped.data,
                    sub_total: ped.sub_total,
                    frete: ped.frete,
                    desconto: ped.desconto,
                    valor_total: ped.valor_total,
                    pagamento_tipo: ped.tipo,
                    parcelamento: ped.parcelamento,
                    entrega_tipo: ped.entrega_tipo,
                    entrega_prazo: ped.entrega_prazo,
                    status_entrega: ped.status,
                    imagem: ped.imagem,
                    cep: ped.cep,
                    logradouro: ped.logradouro,
                    numero: ped.numero,
                    complemento: ped.complemento,
                    bairro: ped.bairro,
                    cidade: ped.cidade,
                    uf: ped.uf,
                    telefone: ped.telefone,
                    request: {
                        tipo: 'GET',
                        descrição: 'Retorna os detalhes de um pedido específico',
                        url: 'http://localhost:3002/pedidos/' + ped.id_pedido
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }

}


// Retorna valor total mês
exports.getPedidosValor = async (req, res, next) => {
    try {
        
        const result = await mysql.execute(
                 `SELECT    data, 
                            valor_total,
                            sub_total
                    FROM    pedidos
              INNER JOIN    pedidos_detalhes
                      ON    pedidos_detalhes.id_pedido = pedidos.id_pedido
                ORDER BY    data;`
        )

        const response = {
            totalPedidos: result.length,
            vendas: result.map(ped => {
                return {
                    id_pedido: ped.id_pedido,
                    data: ped.data,
                    valor_total: ped.valor_total,
                    sub_total: ped.sub_total
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


//Insere um pedido
exports.postPedidos = async (req, res, next) => {
    try {
        const query = `INSERT INTO pedidos 
            (
                id_user,
                data,
                frete,
                desconto,
                valor_total,
                pagamento_tipo,
                parcelamento,
                entrega_tipo,
                entrega_prazo,
                status_entrega,
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                uf,
                telefone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const result = await mysql.execute(query,
            [
                req.body.id_user,
                req.body.data,
                req.body.frete,
                req.body.desconto,
                req.body.valor_total,
                req.body.entrega_tipo,
                req.body.entrega_prazo,
                req.body.status_entrega,
                req.body.pagamento_tipo,
                req.body.parcelamento,
                req.body.cep,
                req.body.logradouro,
                req.body.numero,
                req.body.complemento,
                req.body.bairro,
                req.body.cidade,
                req.body.uf,
                req.body.telefone,
            ])
        const response = {
            mensagem: 'Pedido inserido com sucesso!',
            pedidoCriado: {
                id: result.insertId,
                id_user: req.body.id_user,
                data: req.body.data,
                frete: req.body.frete,
                desconto: req.body.desconto,
                valor_total: req.body.valor_total,
                entrega_tipo: req.body.entrega_tipo,
                entrega_prazo: req.body.entrega_prazo,
                status_entrega: req.body.status_entrega,
                pagamento_tipo: req.body.pagamento_tipo,
                parcelamento: req.body.parcelamento,
                cep: req.body.cep,
                logradouro: req.body.logradouro,
                numero: req.body.numero,
                complemento: req.body.complemento,
                bairro: req.body.bairro,
                cidade: req.body.cidade,
                uf: req.body.uf,
                telefone: req.body.telefone,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna todos os pedidos',
                    url: 'http://localhost:3002/pedidos'
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


//Retorna um pedido
exports.getUmPedido = async (req, res, next) => {
    try {
        const query = `SELECT   pedidos.id_pedido,
                                id_user,
                                data,
                                frete,
                                pedidos.desconto,
                                valor_total,
                                pagamento_tipo,
                                parcelamento,
                                entrega_tipo,
                                entrega_prazo,
                                status_entrega,
                                pedidos.cep,
                                pedidos.logradouro,
                                pedidos.numero,
                                pedidos.complemento,
                                pedidos.bairro,
                                pedidos.cidade,
                                pedidos.uf,
                                pedidos.telefone,
                                usuarios.nome,
                                pagamento.tipo,
                                SUM(pedidos_detalhes.sub_total) as sub_total,
                                status,
                                imagem
                        FROM    pedidos
                  INNER JOIN    usuarios
                          ON    usuarios.id_usuario = pedidos.id_user
                  INNER JOIN    pedidos_detalhes
                          ON    pedidos_detalhes.id = pedidos.id_pedido        
                  INNER JOIN    pagamento
                          ON    pagamento.id = pedidos.pagamento_tipo
                  INNER JOIN    status_entrega
                          ON    status_entrega.id = pedidos.status_entrega
                  INNER JOIN    produtos
                          ON    produtos.id = pedidos.id_pedido
                       WHERE    pedidos.id_pedido = ?
                    GROUP BY    pedidos.id_pedido;`
        const result = await mysql.execute(query, [req.params.id])

        if (result.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado produto com este ID'
            })
        }
        const response = {
            pedido: {
                id: result[0].id_pedido,
                id_user: result[0].id_user,
                nome_usuario: result[0].nome,
                data: result[0].data,
                sub_total: result[0].sub_total,
                frete: result[0].frete,
                desconto: result[0].desconto,
                valor_total: result[0].valor_total,
                pagamento_tipo: result[0].pagamento_tipo,
                parcelamento: result[0].parcelamento,
                entrega_tipo: result[0].entrega_tipo,
                entrega_prazo: result[0].entrega_prazo,
                status_entrega: result[0].status,
                imagem: result[0].imagem,
                cep: result[0].cep,
                logradouro: result[0].logradouro,
                numero: result[0].numero,
                complemento: result[0].complemento,
                bairro: result[0].bairro,
                cidade: result[0].cidade,
                uf: result[0].uf,
                telefone: result[0].telefone
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


//Altera um pedido
exports.updatePedidos = async (req, res, next) => {
    try {
        const query =
            `UPDATE      pedidos
                             SET        id_user           = ?,
                                        data              = ?,
                                        frete             = ?,
                                        desconto          = ?,
                                        valor_total       = ?,
                                        pagamento_tipo    = ?,
                                        parcelamento      = ?,
                                        entrega_tipo      = ?,
                                        entrega_prazo     = ?,
                                        status_entrega    = ?,
                                        cep               = ?,
                                        logradouro        = ?,
                                        numero            = ?,
                                        complemento       = ?,
                                        bairro            = ?,
                                        cidade            = ?,
                                        uf                = ?,
                                        telefone          = ?
                           WHERE        id_pedido         = ?;`
        await mysql.execute(query,
            [
                req.body.id_pedido,
                req.body.id_user,
                req.body.data,
                req.body.frete,
                req.body.desconto,
                req.body.valor_total,
                req.body.pagamento_tipo,
                req.body.parcelamento,
                req.body.entrega_tipo,
                req.body.entrega_prazo,
                req.body.status_entrega,
                req.body.cep,
                req.body.logradouro,
                req.body.numero,
                req.body.complemento,
                req.body.bairro,
                req.body.cidade,
                req.body.uf,
                req.body.telefone
            ])
        const response = {
            mensagem: 'Produto alterado com sucesso!',
            produtoEditado: {
                id: req.body.id_pedido,
                id_user: req.body.id_user,
                data: req.body.data,
                frete: req.body.frete,
                desconto: req.body.desconto,
                valor_total: req.body.valor_total,
                pagamento_tipo: req.body.pagamento_tipo,
                parcelamento: req.body.parcelamento,
                entrega_tipo: req.body.entrega_tipo,
                entrega_prazo: req.body.entrega_prazo,
                status_entrega: req.body.status_entrega,
                cep: req.body.cep,
                logradouro: req.body.logradouro,
                numero: req.body.numero,
                complemento: req.body.complemento,
                bairro: req.body.bairro,
                cidade: req.body.cidade,
                uf: req.body.uf,
                telefone: req.body.telefone,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna os detalhes de um pedido específico',
                    url: 'http://localhost:3002/pedidos/' + req.body.id_pedido
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Remove um pedido
exports.deletePedidos = async (req, res, next) => {
    try {
        const query = `DELETE FROM pedido WHERE id_pedido = ?`
        await mysql.execute(query, [req.body.id])
        const response = {
            mensagem: 'Pedido removido com sucesso!',
            request: {
                tipo: 'POST',
                descrição: 'Insere um pedido',
                url: 'http://localhost:3002/pedido/',
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
