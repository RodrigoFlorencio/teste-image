const express = require('express')
const router = express.Router()
const multer = require('multer')
const login = require('../middleware/login')

const FornecedoresController = require('../controllers/fornecedores-controller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
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

router.get('/', FornecedoresController.getFornecedores)

router.post('/', upload.single('imagem'), FornecedoresController.postFornecedores)

router.get('/:id', FornecedoresController.getUmFornecedor)

router.post('/:id', FornecedoresController.updateFornecedor)

router.delete('/:id', FornecedoresController.deleteFornecedores)

// Imagens
//router.post('/:id/imagem', upload.single('imagem'), FornecedoresController.postImagens)

//router.get('/:id_imagem', FornecedoresController.getImagens)

module.exports = router
