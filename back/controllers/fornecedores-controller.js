const mysql = require('../mysql')


// Retorna todos os produtos
exports.getFornecedores = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            `SELECT * FROM fornecedores;`)
        const response = {
            totalFornecedores: result.length,
            fornecedores: result.map(fornece => {
                return {
                    id: fornece.id_fornecedor,
                    nome: fornece.nome,
                    fantasia: fornece.fantasia,
                    cpfCnpj: fornece.cpfCnpj,
                    inscEst: fornece.inscEst,
                    rg: fornece.rg,
                    cep: fornece.cep,
                    logradouro: fornece.logradouro,
                    numero: fornece.numero,
                    complemento: fornece.complemento,
                    bairro: fornece.bairro,
                    cidade: fornece.cidade,
                    uf: fornece.uf,
                    codEstado: fornece.codEstado,
                    codMunicipio: fornece.codMunicipio,
                    fone1: fornece.fone1,
                    fone2: fornece.fone2,
                    fone3: fornece.fone3,
                    email: fornece.email,
                    request: {
                        tipo: 'GET',
                        descrição: 'Retorna os detalhes de um produto específico',
                        url: 'http://localhost:3002/fornecedores/' + fornece.id_fornecedor
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
exports.postFornecedores = async (req, res, next) => {
    try {
        const query = `INSERT INTO fornecedores 
            (
                nome, 
                fantasia, 
                cpfCnpj, 
                inscEst, 
                rg, 
                cep, 
                logradouro, 
                numero, 
                complemento, 
                bairro,
                cidade,
                uf,
                codEstado,
                codMunicipio,
                fone1,
                fone2,
                fone3,
                email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const result = await mysql.execute(query,
            [
                req.body.nome,
                req.body.fantasia,
                req.body.cpfCnpj,
                req.body.inscEst,
                req.body.rg,
                req.body.cep,
                req.body.logradouro,
                req.body.numero,
                req.body.complemento,
                req.body.bairro,
                req.body.cidade,
                req.body.uf,
                req.body.codEstado,
                req.body.codMunicipio,
                req.body.fone1,
                req.body.fone2,
                req.body.fone3,
                req.body.email
            ])
        const response = {
            mensagem: 'Fornecedor inserido com sucesso!',
            fornecedorCriado: {
                id: result.insertId,
                nome: req.body.nome,
                fantasia: req.body.fantasia,
                cpfCnpj: req.body.cpfCnpj,
                inscEst: req.body.inscEst,
                rg: req.body.rg,
                cep: req.body.cep,
                logradouro: req.body.logradouro,
                numero: req.body.numero,
                complemento: req.body.complemento,
                bairro: req.body.bairro,
                cidade: req.body.cidade,
                uf: req.body.uf,
                codEstado: req.body.codEstado,
                codMunicipio: req.body.codMunicipio,
                fone1: req.body.fone1,
                fone2: req.body.fone2,
                fone3: req.body.fone3,
                email: req.body.email,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna todos os fornecedores',
                    url: 'http://localhost:3002/fornecedores'
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Retorna um produto
exports.getUmFornecedor = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM fornecedores WHERE id_fornecedor = ?;'
        const result = await mysql.execute(query, [req.params.id])

        if (result.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado fornecedor com este ID'
            })
        }

        const response = {
            fornecedor: {
                id: result[0].id_fornecedor,
                nome: result[0].nome,
                fantasia: result[0].fantasia,
                cpfCnpj: result[0].cpfCnpj,
                inscEst: result[0].inscEst,
                rg: result[0].rg,
                cep: result[0].cep,
                logradouro: result[0].logradouro,
                numero: result[0].numero,
                complemento: result[0].complemento,
                bairro: result[0].bairro,
                cidade: result[0].cidade,
                uf: result[0].uf,
                codEstado: result[0].codEstado,
                codMunicipio: result[0].codMunicipio,
                fone1: result[0].fone1,
                fone2: result[0].fone2,
                fone3: result[0].fone3,
                email: result[0].email,
                request: {
                    tipo: 'GET',
                    descrição: 'Retorna um fornecedor',
                    url: 'http://localhost:3002/fornecedor'
                }
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


// Altera um produto
exports.updateFornecedor = async (req, res, next) => {
    try {
        const query = `UPDATE   fornecedores 
                       SET      nome            = ?,
                                fantasia        = ?,
                                cpfCnpj         = ?,
                                inscEst         = ?,
                                rg              = ?,
                                cep             = ?,
                                logradouro      = ?,
                                numero          = ?,
                                complemento     = ?,
                                bairro          = ?,
                                cidade          = ?,
                                uf              = ?,                    
                                codEstado       = ?,
                                codMunicipio    = ?,
                                fone1           = ?,
                                fone2           = ?,
                                fone3           = ?,
                                email           = ?
                       WHERE    id_fornecedor   = ?;`

        const result = await mysql.execute(query,
            [
                req.body.nome, 
                req.body.fantasia, 
                req.body.cpfCnpj, 
                req.body.inscEst, 
                req.body.rg, 
                req.body.cep, 
                req.body.logradouro, 
                req.body.numero, 
                req.body.complemento, 
                req.body.bairro,
                req.body.cidade,
                req.body.uf,
                req.body.codEstado,
                req.body.codMunicipio,
                req.body.fone1,
                req.body.fone2,
                req.body.fone3,
                req.body.email,
                req.params.id
            ])
        const response = {
            mensagem: 'Fornecedor alterado com sucesso!'
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


//Remove um produto
exports.deleteFornecedores = async (req, res, next) => {
    try {
        const query = `DELETE FROM fornecedores WHERE id_fornecedor = ?`
        await mysql.execute(query, [req.params.id])
        const response = {
            mensagem: 'Fornecedor removido com sucesso!',
            request: {
                tipo: 'POST',
                descrição: 'Insere um fornecedor',
                url: 'http://localhost:3002/fornecedores/',
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
/* exports.getImagens = async (req, res, next) => {
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
} */


//Insere uma imagem
/* exports.postImagens = async (req, res, next) => {
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
} */
