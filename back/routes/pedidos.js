const express = require('express')
const router = express.Router()
const multer = require('multer')
const login = require('../middleware/login')

const PedidosController = require('../controllers/pedidos-controller')

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

router.get('/', PedidosController.getPedidos)

router.get('/vendas', PedidosController.getPedidosValor)

router.post('/', upload.single('imagem'), PedidosController.postPedidos)

router.get('/:id', PedidosController.getUmPedido)

router.patch('/', PedidosController.updatePedidos)

router.delete('/', PedidosController.deletePedidos)

// Imagens
router.post('/:id/imagem', upload.single('imagem'), PedidosController.postImagens)

router.get('/:id_imagem', PedidosController.getImagens)

module.exports = router
