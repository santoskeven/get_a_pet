import api from '../utils/api'

import {useState, useEffect} from 'react'
import { useNavigate  } from 'react-router-dom'

import userFlashMessages from './userFlashMessages'

export default function useAuth(){
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = userFlashMessages()
    const navigate = useNavigate()

    useEffect( ()=>{

        const token = localStorage.getItem('token')

        if(token){
             api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`
             setAuthenticated(true)
        }

    }, [])

    async function Register(user){

        let msgText = 'Cadastro realizado com sucesso'
        let msgType = 'sucesso'

        try{
            const data = await api.post('/user/register', user).then((response) => {
                return response.data
            })

           await authUser(data)

        }catch(err){
            msgText = err.response.data.message
            msgType = 'error'
    
        }

        setFlashMessage(msgText, msgType)

    }   

    //FUNÇÃO PARA FAZER LOGIN DO USER (ENTRAR COM EMAIL E SENHA)
    async function Login(user) {
        let msgText = 'Login realizado com sucesso'
        let msgType = 'sucess'

        try{

            const data = await api.post('/user/login', user).then((response) => {
            return response.data
            
            }) 

            await authUser(data)

            setFlashMessage(msgText, msgType)

        }catch(error){
            msgText = error.response.data.message
            msgType = 'error'

            setFlashMessage(msgText, msgType)
        }

    }


    //FUNÇÃO PARA FAZER O LOGOUT DO USER (SAIR DA CONTA)
    function Logout() {
        const msgText = 'Logout realizado com sucesso'
        const msgType = 'sucesso'
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)

    }

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }

    return {authenticated, Register, Logout, Login}

}