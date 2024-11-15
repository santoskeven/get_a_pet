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
                image: user.images,
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

        if(pets.length === 0){
            return res.status(404).json({
                message: 'você ainda não tem nenhum pet cadastrado'
            })
        }

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

    static async petDelete(req, res){

        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({
                message: 'iD inválido'
            })
            return
        }

        const token =  getToken(req)
        const user = await getUserToken(token)

        const pet = await petsModel.findOne({_id : id})

        if(!pet){
            res.status(404).json({
                message: 'pet não encontrado'
            })
            return
        }

        if(pet.user._id.toString() !== user._id.toString()){
           res.status(422).json({
            message: 'ocorreu um erro ao executar a ação'
           })
           return
        }

        await petsModel.findByIdAndDelete(id)

        return res.status(200).json({
            message: 'pet removido com sucesso'
        })

    }

    static async petUpdate(req, res){

        const { name, age, weight, color, available } = req.body
        let images = req.files
        let petData = {}

        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({
                message: 'ID inválido'
            })
            return
        }

        const pet = await petsModel.findOne({_id : id})

        if(!pet){
            res.status(404).json({
                message: 'nenhum pet encontrado'
            })
            return
        }

        const token = getToken(req)
        const user = await getUserToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message: 'ocorreu um erro na sua solicitação, revise os dados e tente novamente'
            })
            return
        }

        if(!name){
            res.status(422).json({
                message: 'o campo nome é obrigátorio'
            })
            return
        }else{
             petData.name = name
        }

        if(!age){
            res.status(422).json({
                message: 'o campo idade é obrigátorio'
            })
            return
        }else{
            petData.age = age
        }

        if(!weight){
            res.status(422).json({
                message: 'o campo peso é obrigátorio'
            })
            return
        }else{
            petData.weight = weight
        }

        if(!color){
            res.status(422).json({
                message: 'o  campo cor é obrigátorio'
            })
            return
        }else{
            petData.color = color
        }

        if(!available){
            res.status(422).json({
                message: 'o campo available é obrigátorio'
            })
            return
        }else{
            petData.available = available
        }

        if(images.length === 0){
            res.status(422).json({
                message: 'o campo imagem é  obrigátorio'
            })
            return
        }else{
            petData.images = []
            images.map((image) => {
                petData.images.push(image.filename)
            })
        }

        await petsModel.findByIdAndUpdate(id, petData)

        return res.status(200).json({
            message: 'pet atualiado com sucesso',
        })

    }

    static async schedulePet (req, res){

        const id = req.params.id


        if(!ObjectId.isValid(id)){
            res.status(422).json({
                message: 'ID inválido'
            })
            return 
        }

        const pet = await petsModel.findOne({_id : id})

        if(!pet){
            res.status(404).json({
                pet: [],
                message: 'nenhum pet encontrado, revise os dados e tente novamnete'
            })
            return 
        }

        const token = getToken(req)
        const user = await getUserToken(token)

        if(pet.available === false){
            return res.status(422).json({
                message: 'esse pet não está diponível para adoção'
            })
        }

        if(pet.user._id.equals(user._id)){
            res.status(422).json({
                message: 'Você não pode agendar uma visita para o seu próprio pet'
            })
            return
        }

        if(pet.adopter){
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({
                    message: 'Você já agendou uma visita para este pet'
                })
                return
            }
        }

        pet.adopter = {
            _id: user._id,
            name: user.name,
            phone: user.phone
        }

        await petsModel.findByIdAndUpdate(id, pet)

        return res.status(200).json({
            message: `visita agendada com sucesso, entre em contato com ${user.name}, pelo número ${user.phone}, para mais informações`
        })


    }

    static async concludePet (req, res){

        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({
                message: 'ID inválido'
            })
            return
        }

        const pet = await petsModel.findOne({_id : id})

        if(!pet){
            res.status(404).json({
                message: 'pet não encontrado'
            })
            return 
        }

        const token = getToken(req)
        const user = await getUserToken(token)

        if(!pet.user._id.equals(user._id)){
            res.status(422).json({
                message: 'ocorreu um erro ao solicitar sua requisição, revise os dados e tente novamente'
            })
            return
        }

        pet.available = false

        await petsModel.findByIdAndUpdate(id, pet)

        return res.status(200).json({
             message: 'Todas as etapas de adoção foram concluídas com sucesso!'
        })
        
    }

}