const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()

//cofigurando json
app.use(express.json())

//cofigurando cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//cofigue public
app.use(express.static('public'))

//routes
const userRoutes = require('./routes/user')
app.use('/user', userRoutes)

app.listen(5000, ()=>{
    console.log('sevidor rodando na porta 5000')
})