const express = require('express')
const router = express.Router()
const multer = require('multer')
const login = require('../middleware/login')

const PedidosDetalhesController = require('../controllers/pedidosDetalhes-controller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname )
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

router.get('/', PedidosDetalhesController.getPedidos)

router.post('/', PedidosDetalhesController.postPedidos)

router.get('/:id', PedidosDetalhesController.getUmPedido)

// router.patch('/', PedidosDetalhesController.updatePedidos)

// router.delete('/', PedidosDetalhesController.deletePedidos)

// Imagens
/* router.post('/:id/imagem', 
            login.obrigatorio, 
            upload.single('imagem'), 
            PedidosDetalhesController.postImagens
) */

// router.get('/:id_imagem', PedidosDetalhesController.getImagens)

module.exports = router






























/* const express = require('express')
const router = express.Router()

const PedidosController = require('../controllers/pedidos-controller')

// Retorna todos os pedidos
router.get('/', PedidosController.getPedidos)


// Posta um pedido
router.post('/', PedidosController.postPedidos)


// Retorna um pedido pelo ID
router.get('/:id_pedido', PedidosController.getUmPedidos)


// Remove um pedido
router.delete('/', PedidosController.deletePedidos)


module.exports = router */





































/* const express = require('express')
const router = express.Router()

const PedidosDetalhesController = require('../controllers/pedidosDetalhes-controller')

// Retorna todos os pedidos
router.get('/', PedidosDetalhesController.getPedidos)


// Posta um pedido
router.post('/', PedidosDetalhesController.postPedidos)


// Retorna um pedido pelo ID
router.get('/:id', PedidosDetalhesController.getUmPedidos)


// Remove um pedido
router.delete('/', PedidosDetalhesController.deletePedidos)


module.exports = router */