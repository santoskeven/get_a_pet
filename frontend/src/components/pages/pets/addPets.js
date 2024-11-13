import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../utils/api'

import style from './addPet.module.css'

import PetForm from '../../form/Petform'
import useFlashMessage from '../../../hooks/userFlashMessages'


function AddPets(){
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()


    async function registerPet(pet){
        let msgType = 'sucess'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }else{
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if(msgType !== 'error'){
            navigate('/pets/mypets')
        } 
    }

    return(
        <section className={style.header}>
            <div>
                <h1>Cadastrar pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>

            <PetForm handleSubmit={registerPet} btnText='CADASTRAR'/>
        </section>
    )
}

export default AddPets