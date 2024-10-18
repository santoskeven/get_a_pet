const  jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

    //criar o token
    const token = jwt.sign({
        //passar meta dados que podem ser ligos descriptografando o token
        name: user.name,
        id: user._id
    }, "nossosecret")

    //retornar o token 
    res.status(200).json({
        message: 'token criado com sucesso',
        token: token,
        UserId: user._id
    })

}

module.exports = createUserToken