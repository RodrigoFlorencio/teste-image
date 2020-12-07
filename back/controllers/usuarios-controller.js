const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('../mysql').pool


//Cadastra um usúario
exports.postCadastro = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query(`SELECT * FROM usuarios WHERE email = ? `, [req.body.email], (error, result) => {
            if (err) { return res.status(500).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'Usúario já cadastrado' })
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO usuarios (
                            nome, 
                            sobrenome,
                            nascimento, 
                            cpf,  
                            email, 
                            cep, 
                            logradouro, 
                            numero, 
                            complemento, 
                            bairro,
                            cidade,
                            uf,
                            tel,
                            senha ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [
                            req.body.nome,
                            req.body.sobrenome,
                            req.body.nascimento,
                            req.body.cpf,
                            req.body.email,
                            req.body.cep,
                            req.body.logradouro,
                            req.body.numero,
                            req.body.complemento,
                            req.body.bairro,
                            req.body.cidade,
                            req.body.uf,
                            req.body.tel,
                            hash
                        ],
                        (error, result) => {
                            conn.release()
                            if (error) { return res.status(500).send({ error: error }) }
                            response = {
                                mensagem: 'Usúario criado com sucesso!',
                                usuarioCriado: {
                                    id_usuario: result.insertId,
                                    nome: req.body.nome,
                                    sobrenome: req.body.sobrenome,
                                    email: req.body.email
                                }
                            }
                            return res.status(201).send({ response })
                        }
                    )
                })
            }
        })

    })
}


//Faz login
exports.postLogin = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM usuarios WHERE email = ?`
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release()
            if (err) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
                }
                if (result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email

                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "2h"
                        })
                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso!',
                        token: token,
                        results
                    })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    })
}
