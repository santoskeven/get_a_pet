const userModel = require('../model/User')

module.exports = class userController{

    static async register (req, res){
        res.json('Olá, json')
    }

}
