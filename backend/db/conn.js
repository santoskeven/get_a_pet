const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost:27017/getapet')
    console.log('conectado com sucesso com mongoose')
}

main().catch((err)=>{console.log(`ocorreu um erro ${err}`)})

module.exports = mongoose