const userModel = require('../model/User')
const createUserToken = require('../helprs/create-user-token')
const bcrypt = require('bcrypt')


module.exports = class userController{

    static async register (req, res){
       const {name, email, phone, password, confirmpassword} = req.body;

        if(!name){
            res.status(422).json({message: "campo Usuário é obrigatorio"})
            return
        }

        if(!email){
            res.status(422).json({message: "campo email é obrigatorio"})
            return
        }

        if(!password){
            res.status(422).json({message: "campo passoword é obrigatorio"})
            return
        }

        if(!phone){
            res.status(422).json({message: "campo telefone é obrigatorio"})
            return
        }

        if(!confirmpassword){
            res.status(422).json({message: "campo confirmpassword é obrigatorio"})
            return
        }

        if(password !== confirmpassword){
            res.status(422).json({message: "Senha e confirmção de senha precisam ser iguais"})
            return
        }

       
        const existsUser = await userModel.findOne({email:email})

        if(existsUser){
            res.status(422).json({message: 'este email já está em uso, tente novamente com outro email'})
            return
        }
    
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new userModel({
            name,
            email,
            phone, 
            password: passwordHash,
        })

        try{
            const newUser = await user.save()
            
            // res.status(200).json({
            //     message: 'tudo ok',
            //     newUser
            // })

            await createUserToken(newUser, req, res)
        }catch(err){
            res.status(500).json({message: err})
            return
        }
        
    }

}
