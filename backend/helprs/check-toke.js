const jwt = require('jsonwebtoken')

const getToken = require('./get-token')

const ckeckToken = async (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(422).json({message: 'acesso negado 1'})
    }

    const token  = getToken(req)

    if(!token){
        return res.status(422).json({message: 'token inválido'})
    }

   try{
        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()
   }catch(err){
       return res.status(422).json({message: 'acesso negado 2'})
   }

}

module.exports = ckeckToken