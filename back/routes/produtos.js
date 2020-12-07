const express = require('express')
const router = express.Router()
const multer = require('multer')
const login = require('../middleware/login')

const ProdutosController = require('../controllers/produtos-controller')

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
    fileFilter: fileFilter
})

router.get('/', ProdutosController.getProdutos)

router.post('/', upload.single('imagem'), ProdutosController.postProdutos)

router.get('/:id', ProdutosController.getUmProduto)

router.post('/:id', ProdutosController.updateProdutos)

router.delete('/:id', ProdutosController.deleteProdutos)

// Imagens
router.post('/:id/imagem', 
            login.obrigatorio, 
            upload.single('imagem'), 
            ProdutosController.postImagens
)

router.get('/:id_imagem', ProdutosController.getImagens)

module.exports = router
