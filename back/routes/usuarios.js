const express = require('express')
const router = express.Router()

const UsuariosController = require('../controllers/usuarios-controller')

// Cria um novo usúario
router.post('/cadastro', UsuariosController.postCadastro)


// Fazer login com usúario já cadastrado
router.post('/login', UsuariosController.postLogin)

module.exports = router
