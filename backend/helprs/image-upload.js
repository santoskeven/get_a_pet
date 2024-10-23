const { match } = require('assert')
const multer = require('multer')
const path = require('path')

const imageStore = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ''

        if(req.baseUrl.includes('user')){
            folder = 'user'
        }else if(req.baseUrl.includes('pets')){
            folder = 'pets'
        }
        cb(null, `public/image/${folder}`)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStore, 
    fileFilter(req, file, cb){
        console.log(file.originalname)
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Por favor, adiocione uma imagem em formato png ou jpg'))
        }
        cb(undefined, true)
    },
})

module.exports = { imageUpload }