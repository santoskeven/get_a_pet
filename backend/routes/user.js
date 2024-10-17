const router = require('express').Router()

const UserController = require('../controller/user')

router.post('/register', UserController.register)

module.exports = router