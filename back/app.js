const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const rotaProdutos = require('./routes/produtos')
const rotaPedidos = require('./routes/pedidos')
const rotaPedidosDetalhes = require('./routes/pedidosDetalhes')
const rotaFornecedores = require('./routes/fornecedores')
const rotaUsuarios = require('./routes/usuarios')
const rotaImagens = require('./routes/imagens')


app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false })) // apenas dados simples
app.use(bodyParser.json()) // json de entrada no body
app.use(cors())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 
               'Origin, X-Request-With, Content-Type, Accept, Authorization')
        if(req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).send({})
        }
        next()
})

app.use('/produtos', rotaProdutos)
app.use('/pedidos', rotaPedidos)
app.use('/pedidos-detalhes', rotaPedidosDetalhes)
app.use('/fornecedores', rotaFornecedores)
app.use('/usuarios', rotaUsuarios)
app.use('/imagens', rotaImagens)


// Quando não encontra rota, entra aqui
app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app
