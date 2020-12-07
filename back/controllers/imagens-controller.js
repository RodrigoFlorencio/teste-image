const mysql = require('../mysql')

// Retorna todos os produtos
exports.getImagens = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            `SELECT * FROM imagens;`)
        const response = {
            totalImagens: result.length,
            imagens: result.map(img => {
                return {
                    id: img.id,
                    imagem: img.imagem
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }

}


// Insere um produto
exports.postImagens = async (req, res, next) => {
    try {
        const query = `INSERT INTO imagens (imagem) VALUES (?)`
        const result = await mysql.execute(query,
            [
                req.body.imagem
            ])
        const response = {
            mensagem: 'Imagem inserida com sucesso!',
            imagemCriado: {
                id: result.insertId,
                imagem: req.body.imagem
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}


//Remove uma imagem
exports.deleteImagens = async (req, res, next) => {
    try {
        const query = `DELETE FROM imagens_produtos WHERE id_imagem = ?`
        await mysql.execute(query, [req.params.id_imagem])
        const response = {
            mensagem: 'Imagem removida com sucesso!',
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error }) 
    }
}