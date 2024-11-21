import api from '../../../utils/api'

import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import styles from './addPet.module.css'

import PetForm from '../../form/Petform'

import useFlashMessage from '../../../hooks/userFlashMessages'

function EditPets (){

    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

     useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((res) => {
             setPet(res.data.pet)
        })
    }, [token, id])

    async function updatePet(pet) {
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

       const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'               
            }
       })
       .then((res) => {
            console.log(pet)
            return res.data
       })
       .catch((err) => {
            msgType = 'error'
            console.log(pet)
            return err.response.data
       })

       setFlashMessage(data.message, msgType)
    }

    return(
        <section>
            <div className={styles.header}>
                {pet.name && 
                   <>
                     <h1>Editando o pet: {pet.name}</h1>   
                     <p>Depois os dados serão atualizados no sistema</p>

                     <PetForm handleSubmit={updatePet} btnText='Atualizar' petData={pet} />
                   </>
                }
            </div>
        </section>
    )

}

export default EditPets