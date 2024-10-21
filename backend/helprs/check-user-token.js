const User = require('../model/User')
const jwt = require('jsonwebtoken')

const checkUserToken = async (token) => {

    if(!token){
        res.status(422).json({message: 'token inválido'})
        return
    }

    const decoded = jwt.verify(token, 'nossosecret')

    const userId = decoded.id

    const user = await User.findById(userId)

    return user

}

module.exports = checkUserToken