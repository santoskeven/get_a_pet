import api from '../../../utils/api'

import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import styles from './addPet.module.css'

import PetForm from '../../form/Petform'

// import useFlashMessage from '../../../hooks/userFlashMessages'

function EditPets (){

    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    // const {setFlashMessage} = useFlashMessage()

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

    async function updatePet() {}

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