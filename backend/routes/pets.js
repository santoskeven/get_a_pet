const router = require('express').Router()
const petController = require('../controller/pets')

//protetor de rota
const checktoken = require('../helprs/check-toke')
const {imageUpload} = require('../helprs/image-upload')

router.post('/create', checktoken, imageUpload.array('images'), petController.create)
router.get('/mypets', checktoken, petController.getUserPets)
router.get('/myadoptions', petController.myAdoptions)
router.get('/:id', petController.petId)
router.delete('/:id', checktoken, petController.petDelete)
router.patch('/:id', checktoken, imageUpload.array('images'), petController.petUpdate)
router.patch('/schedule/:id', checktoken, petController.schedulePet)
router.get('/', petController.getAllPets)


module.exports = router