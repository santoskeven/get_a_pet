const petsModel = require('../model/Pets')

const ObjectId = require('mongoose').Types.ObjectId

//helpers
const getToken = require('../helprs/get-token')
const getUserToken = require('../helprs/check-user-token')

module.exports = class petController{

    static async create (req, res){

        const {name, age, weight, color} = req.body

        const images = req.files

        const available = true;

        if(!name){
            return res.status(422).json({message: 'o campo nome é obrigatório'})
        }

        if(!age){
            return res.status(422).json({message: 'o campo idade é obrigatório'})
        }

        if(!weight){
            return res.status(422).json({message: 'o campo peso é obrigatório'})
        }

        if(!color){
            return res.status(422).json({message: 'o campo cor é obrigatório'})
        }

        try{
            if(images.length === 0){
                return res.status(422).json({message: 'o campo imagem é obrigatório'})
            }
        }catch{
            return res.status(422).json({message: 'envie o campo imagem pelo form'})
        }

        //get user infos
        const token = getToken(req)
        const user = await getUserToken(token)

        const pet = new petsModel({
            name,
            age,
            weight,
            color,
            images: [],
            available,
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })


         try{
            //criar pet no banco de dados
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet criado com sucesso',
                newPet
            })
         }catch(err){
            res.status(500).json({message: `erro ao criar pet, error : ${err}`})
            return
         }
    }

    static async getAllPets (req, res){

        const pets = await petsModel.find().sort('-createdAt')

        // const dog = await petsModel.findOne({us:'67184f36bd22bf05df0a54c4'})

        res.status(200).json({
            pets:pets
        })

    }

    static async getUserPets (req, res){

        const token = getToken(req)
        const user = await getUserToken(token)

        const pets = await petsModel.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets
        })

    }

    static async myAdoptions (req, res){    

        const token = getToken(req)
        const user = await getUserToken(token)

        const pets = await petsModel.find({"adopter._id": user._id})

        res.status(200).json({
            pets
        })

    }

    static async petId (req, res){
        
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({
                message: 'iD inválido'
            })
            return
        }
         
        const pet = await petsModel.findById(id)

        if(!pet){
           return res.status(404).json({
                message: 'pet não encontrado'
            })
        }

        res.status(200).json({
            pet
        })
        
    }
}