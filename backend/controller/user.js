const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helprs/create-user-token')
const getToken = require('../helprs/get-token')
const checkUserToken = require('../helprs/check-user-token')


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

            return await createUserToken(newUser, req, res)
        }catch(err){
            res.status(500).json({message: err})
            return
        }
        
    }

    static async login (req, res){
        
        const {email, password} = req.body

        if(!email){
            res.status(422).json({message: 'email inválido, tente novamente'})
            return
        }

        if(!password){
             res.status(422).json({message: 'senha encorreta, tente novament'})
             return
        }

        const user = await userModel.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'email inválido, tente novamente'})
            return
        }

        const passwordHash =  bcrypt.compare(password, user.password)

        if(!passwordHash){
            res.status(422).json({message: 'senha inválida, tente novamente'})
            return 
        }

        try{
            await createUserToken(user, req, res)
        }catch(err){console.log(err)}

    }

    static async checkUser (req, res){

        let currentUser;

        if(req.headers.authorization){

            const authToken = getToken(req)
            const decoded = jwt.verify(authToken, 'nossosecret')

            currentUser = await userModel.findById({_id : decoded.id})

            currentUser.password = undefined
        }else{
            currentUser = null
        }

        res.status(200).send(currentUser)

    }
    
    static async editUser (req, res){

        const token = getToken(req)
        const user = await checkUserToken(token)

        const {name, email, phone, password, confirmpassword} = req.body;

        if(req.file){
            user.image = req.file.filename
        }

        if(!name){
            res.status(422).json({message: "campo Usuário é obrigatorio"})
            return
        }

        user.name = name

        if(!email){
            res.status(422).json({message: "campo email é obrigatorio"})
            return
        }

        const UserExists = await userModel.findOne({email:email})

        if(user.email !== email && UserExists){
            res.status(422).json({message: 'por favor, utilize um email diferente'})
            return
        }

        user.email = email

        if(!password){
            res.status(422).json({message: "campo passoword é obrigatorio"})
            return
        }   

        if(password !== confirmpassword){
            res.status(422).json({message: 'as senhas não são iguais, tente novamente'})
            return
        }else if(password === confirmpassword && password != null){

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash

        }

        if(!phone){
            res.status(422).json({message: "campo telefone é obrigatorio"})
            return
        }

        user.phone = phone

        try{

            //passar a func que ira atualizar o user
            await userModel.findOneAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true}
            )
            //se passar eu torno o json com messagem de sucesso
            res.status(200).json({message: 'Usuário atualizado com sucesso'})
        }catch(err){
            res.status(500).json({message: 'erro ao atualizar o usuário, tente novamente'})
            return
        }

    }
}
