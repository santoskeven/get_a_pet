const router = require('express').Router()

const UserController = require('../controller/user')
const ckeckToken = require('../helprs/check-toke')
const { imageUpload } = require('../helprs/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
router.patch(
    '/edit/:id', 
    ckeckToken, 
    imageUpload.single('image'), 
    UserController.editUser
)

module.exports = router