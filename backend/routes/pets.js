const router = require('express').Router()
const petController = require('../controller/pets')

//protetor de rota
const checktoken = require('../helprs/check-toke')
const {imageUpload} = require('../helprs/image-upload')

router.post('/create', checktoken, imageUpload.array('images'), petController.create)
router.get('/mypets', checktoken, petController.getUserPets)
router.get('/', petController.getAllPets)


module.exports = router