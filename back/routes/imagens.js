const express = require('express')
const router = express.Router()
// const multer = require('multer')


// const login = require('../middleware/login')
const imageMiddleware = require('../middleware/imageMiddleware')
const ImagensController = require('../controllers/imagens-controller')


router.post('/', imageMiddleware.upload, imageMiddleware.resize, ImagensController.postImagens)

router.get('/', ImagensController.getImagens)

// router.get('/:id_imagem', ProdutosController.getImagens)

// router.delete('/:id_imagem', ImagensController.deleteImagens)

module.exports = router
